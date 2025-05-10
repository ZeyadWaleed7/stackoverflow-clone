const express = require('express');
const jwt = require('jsonwebtoken');
const redis = require('redis');
const axios = require('axios');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://auth-service:5000';
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://user-service:5001';
const QA_SERVICE_URL = process.env.QA_SERVICE_URL || 'http://qa-service:8083';
const VOTE_SERVICE_URL = process.env.VOTE_SERVICE_URL || 'http://vote-service:8084';

// CORS configuration
app.use((req, res, next) => {
    const allowedOrigins = [
        process.env.FRONTEND_URL || 'http://localhost:5173',
        'http://localhost:8080',
        'https://accounts.google.com',
        'http://localhost:5000'
    ];

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, auth-token');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

const redisClient = redis.createClient({ url: process.env.REDIS_URL || 'redis://redis:6379' });
redisClient.connect().then(() => console.log('Connected to Redis'))
    .catch(err => console.error('Redis connection error:', err));

const jwtSecretKey = process.env.JWT_SECRET_KEY || process.env.JWT_SECRET;
const tokenHeaderKey = process.env.TOKEN_HEADER_KEY || 'auth-token';

const validateToken = (req, res, next) => {
    const token = req.header(tokenHeaderKey);
    if (!token) return res.status(403).send("Token missing");

    if (!jwtSecretKey) {
        console.error("JWT secret key is not defined in environment variables");
        return res.status(500).send("Server configuration error");
    }

    try {
        const verified = jwt.verify(token, jwtSecretKey);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(401).send("Invalid Token");
    }
};

const requireRoles = (...requiredRoles) => {
    return (req, res, next) => {
        const userRoles = req.user?.roles || [];
        const hasRole = requiredRoles.some(role => userRoles.includes(role));
        if (!hasRole) {
            return res.status(403).json({ error: 'Forbidden: insufficient roles' });
        }
        next();
    };
};

const rateLimiter = (limit, windowSeconds) => {
    return async (req, res, next) => {
        const ip = req.ip;
        const userId = req.user?.userId || 'anonymous';
        const key = `ratelimit:${userId}:${ip}`;
        const count = parseInt(await redisClient.get(key)) || 0;
        if (count >= limit) {
            return res.status(429).json({ error: 'Rate limit exceeded' });
        }
        await redisClient.set(key, count + 1, { EX: windowSeconds });
        next();
    };
};

const concurrencyLimiter = (maxConcurrent) => {
    let activeRequests = 0;
    return (req, res, next) => {
        if (activeRequests >= maxConcurrent) {
            return res.status(429).send('Too many concurrent requests');
        }
        activeRequests++;
        res.on('finish', () => activeRequests--);
        next();
    };
};

const forwardToService = (baseUrl) => {
    return async (req, res) => {
        const path = req.path;
        const targetUrl = `${baseUrl}${path}`;

        console.log(`[${new Date().toISOString()}] Forwarding ${req.method} request to ${targetUrl}`);
        console.log('Request headers:', req.headers);
        console.log('Request query:', req.query);

        try {
            const headers = { ...req.headers };
            if (req.user) {
                headers['x-user-id'] = req.user.userId;
                headers['x-user-roles'] = JSON.stringify(req.user.roles);
            }

            const response = await axios({
                method: req.method,
                url: targetUrl,
                data: req.body,
                headers: headers,
                params: req.query,
                maxRedirects: 5,
                validateStatus: function (status) {
                    return status >= 200 && status < 400; // Accept redirects
                }
            });

            // Handle redirects
            if (response.status >= 300 && response.status < 400 && response.headers.location) {
                console.log('Redirecting to:', response.headers.location);
                return res.redirect(response.headers.location);
            }

            // Handle normal responses
            res.status(response.status);
            for (const [key, value] of Object.entries(response.headers)) {
                if (key !== 'transfer-encoding' && key !== 'connection') {
                    res.setHeader(key, value);
                }
            }

            if (typeof response.data === 'object') {
                res.json(response.data);
            } else {
                res.send(response.data);
            }
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error forwarding to ${targetUrl}:`, error.message);
            if (error.response) {
                console.error('Response error:', {
                    status: error.response.status,
                    data: error.response.data,
                    headers: error.response.headers
                });

                // Handle redirects in error responses
                if (error.response.status >= 300 && error.response.status < 400 && error.response.headers.location) {
                    return res.redirect(error.response.headers.location);
                }

                res.status(error.response.status);
                if (typeof error.response.data === 'object') {
                    res.json(error.response.data);
                } else {
                    res.send(error.response.data);
                }
            } else {
                res.status(503).json({
                    error: 'Service unavailable',
                    service: baseUrl,
                    details: error.message
                });
            }
        }
    };
};

app.use(concurrencyLimiter(100));
app.use(rateLimiter(60, 60));

// Service health check
const checkServiceHealth = async (serviceUrl) => {
    try {
        const response = await axios.get(`${serviceUrl}/health`);
        return response.status === 200;
    } catch (error) {
        console.error(`Health check failed for ${serviceUrl}:`, error.message);
        return false;
    }
};

// Enhanced health check endpoint
app.get('/health', async (req, res) => {
    const services = {
        auth: await checkServiceHealth(AUTH_SERVICE_URL),
        user: await checkServiceHealth(USER_SERVICE_URL),
        redis: redisClient.isReady
    };

    const allHealthy = Object.values(services).every(status => status);
    res.status(allHealthy ? 200 : 503).json({
        status: allHealthy ? 'API Gateway is healthy' : 'API Gateway is unhealthy',
        services
    });
});

app.get('/auth/google', forwardToService(AUTH_SERVICE_URL));
app.get('/auth/google/callback', async (req, res) => {
    try {
        console.log('Received Google OAuth callback with query params:', req.query);
        console.log('Headers:', req.headers);

        const response = await axios.get(`${AUTH_SERVICE_URL}/auth/google/callback`, {
            params: req.query,
            headers: req.headers,
            maxRedirects: 5,
            validateStatus: function (status) {
                return status >= 200 && status < 400;
            }
        });

        if (response.status >= 300 && response.status < 400 && response.headers.location) {
            console.log('Redirecting to:', response.headers.location);
            return res.redirect(response.headers.location);
        }

        res.status(response.status);
        for (const [key, value] of Object.entries(response.headers)) {
            if (key !== 'transfer-encoding' && key !== 'connection') {
                res.setHeader(key, value);
            }
        }

        if (typeof response.data === 'object') {
            res.json(response.data);
        } else {
            res.send(response.data);
        }
    } catch (error) {
        console.error('Error in Google OAuth callback:', error);
        if (error.response && error.response.headers && error.response.headers.location) {
            return res.redirect(error.response.headers.location);
        }
        res.redirect('/auth/google/failure');
    }
});
app.post('/auth/token/refresh', forwardToService(AUTH_SERVICE_URL));
app.get('/auth/verify-token', forwardToService(AUTH_SERVICE_URL));
app.get('/auth/google/failure', forwardToService(AUTH_SERVICE_URL));
app.post('/auth/logout', forwardToService(AUTH_SERVICE_URL));

app.get('/api/users', forwardToService(USER_SERVICE_URL));
app.post('/api/users', forwardToService(USER_SERVICE_URL));
app.get('/api/users/userprofile', validateToken, forwardToService(USER_SERVICE_URL));
app.get('/api/users/:id', validateToken, forwardToService(USER_SERVICE_URL));
app.put('/api/users/:id', validateToken, forwardToService(USER_SERVICE_URL));
app.delete('/api/users/:id', validateToken, forwardToService(USER_SERVICE_URL));

app.get('/questions', forwardToService(QA_SERVICE_URL));
app.get('/questions/:id', forwardToService(QA_SERVICE_URL));
app.post('/questions', validateToken, rateLimiter(5, 60), forwardToService(QA_SERVICE_URL));
app.put('/questions/:id', validateToken, forwardToService(QA_SERVICE_URL));
app.delete('/questions/:id', validateToken, forwardToService(QA_SERVICE_URL));

app.get('/questions/:id/answers', forwardToService(QA_SERVICE_URL));
app.post('/questions/:id/answers', validateToken, rateLimiter(10, 60), forwardToService(QA_SERVICE_URL));
app.put('/answers/:id', validateToken, forwardToService(QA_SERVICE_URL));
app.delete('/answers/:id', validateToken, forwardToService(QA_SERVICE_URL));

app.post('/comments', validateToken, forwardToService(QA_SERVICE_URL));
app.get('/comments/question/:questionId', forwardToService(QA_SERVICE_URL));
app.get('/comments/answer/:answerId', forwardToService(QA_SERVICE_URL));
app.delete('/comments/:id', validateToken, forwardToService(QA_SERVICE_URL));

app.post('/votes/question/:id', validateToken, rateLimiter(20, 60), forwardToService(VOTE_SERVICE_URL));
app.post('/votes/answer/:id', validateToken, rateLimiter(20, 60), forwardToService(VOTE_SERVICE_URL));
app.get('/votes/user/:id', validateToken, forwardToService(VOTE_SERVICE_URL));

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

app.listen(PORT, () => {
    console.log(`Stack Overflow Gateway is running on port ${PORT}`);
});
