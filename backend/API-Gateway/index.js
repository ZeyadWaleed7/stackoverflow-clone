   const express = require('express');
   const jwt = require('jsonwebtoken');
   const redis = require('redis');
   const axios = require('axios');
   const app = express();
   
   app.use(express.json());
   const PORT = process.env.PORT || 8080;
   
   // Service URLs
   const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://auth-service:8081';
   const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://user-service:8082';
   const QA_SERVICE_URL = process.env.QA_SERVICE_URL || 'http://qa-service:8083';
   const VOTE_SERVICE_URL = process.env.VOTE_SERVICE_URL || 'http://vote-service:8084';
   
   // Redis client setup
   const redisClient = redis.createClient({ url: process.env.REDIS_URL || 'redis://redis:6379' });
   redisClient.connect().then(() => console.log('Connected to Redis'));
   
   const jwtSecretKey = process.env.JWT_SECRET_KEY;
   const tokenHeaderKey = process.env.TOKEN_HEADER_KEY || 'auth-token';
   
   // --- JWT Validation Middleware ---
   const validateToken = (req, res, next) => {
       const token = req.header(tokenHeaderKey);
       if (!token) return res.status(403).send("Token missing");
       try {
           const verified = jwt.verify(token, jwtSecretKey);
           req.user = verified;
           next();
       } catch (error) {
           return res.status(401).send("Invalid Token");
       }
   };
   
   // --- Role-based Middleware ---
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
   
   // --- Rate Limiting Middleware ---
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
   
   // --- Concurrency Limiting Middleware ---
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
   
   // --- Proxy Middleware ---
   const forwardToService = (baseUrl) => {
       return async (req, res) => {
           const path = req.path;
           const targetUrl = `${baseUrl}${path}`;
           
           console.log(`Forwarding to ${targetUrl}`);
           
           try {
               // Forward user information if authenticated
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
                   responseType: 'stream'
               });
               
               res.status(response.status);
               
               for (const [key, value] of Object.entries(response.headers)) {
                   if (key !== 'transfer-encoding' && key !== 'connection') {
                       res.setHeader(key, value);
                   }
               }
               
               response.data.pipe(res);
           } catch (error) {
               if (error.response) {
                   res.status(error.response.status);
                   error.response.data.pipe(res);
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
   
   // Apply global middlewares
   app.use(concurrencyLimiter(100));
   app.use(rateLimiter(60, 60)); // 60 requests per minute
   
   // --- Health check endpoint ---
   app.get('/health', (req, res) => {
       res.status(200).json({ status: 'API Gateway is healthy' });
   });
   
   // --- Authentication Service Routes ---
   app.post('/auth/register', forwardToService(AUTH_SERVICE_URL));
   app.post('/auth/login', forwardToService(AUTH_SERVICE_URL));
   app.post('/auth/refresh', forwardToService(AUTH_SERVICE_URL));
   app.post('/auth/logout', validateToken, forwardToService(AUTH_SERVICE_URL));
   
   // --- User Service Routes ---
   app.get('/users', validateToken, forwardToService(USER_SERVICE_URL));
   app.get('/users/:id', forwardToService(USER_SERVICE_URL));
   app.put('/users/:id', validateToken, forwardToService(USER_SERVICE_URL));
   app.get('/users/:id/profile', forwardToService(USER_SERVICE_URL));
   
   // --- Q&A Service Routes ---
   app.get('/questions', forwardToService(QA_SERVICE_URL));
   app.get('/questions/:id', forwardToService(QA_SERVICE_URL));
   app.post('/questions', validateToken, rateLimiter(5, 60), forwardToService(QA_SERVICE_URL));
   app.put('/questions/:id', validateToken, forwardToService(QA_SERVICE_URL));
   app.delete('/questions/:id', validateToken, forwardToService(QA_SERVICE_URL));
   
   app.get('/questions/:id/answers', forwardToService(QA_SERVICE_URL));
   app.post('/questions/:id/answers', validateToken, rateLimiter(10, 60), forwardToService(QA_SERVICE_URL));
   app.put('/answers/:id', validateToken, forwardToService(QA_SERVICE_URL));
   app.delete('/answers/:id', validateToken, forwardToService(QA_SERVICE_URL));
   
   // --- Voting Service Routes ---
   app.post('/votes/question/:id', validateToken, rateLimiter(20, 60), forwardToService(VOTE_SERVICE_URL));
   app.post('/votes/answer/:id', validateToken, rateLimiter(20, 60), forwardToService(VOTE_SERVICE_URL));
   app.get('/votes/user/:id', validateToken, forwardToService(VOTE_SERVICE_URL));
   
   // --- Admin Routes ---
   app.get('/admin/dashboard', validateToken, requireRoles('admin', 'moderator'), forwardToService(USER_SERVICE_URL));
   app.get('/admin/users', validateToken, requireRoles('admin'), forwardToService(USER_SERVICE_URL));
   app.get('/admin/questions', validateToken, requireRoles('admin', 'moderator'), forwardToService(QA_SERVICE_URL));
   
   // --- Start Server ---
   app.listen(PORT, () => {
       console.log(`Stack Overflow Gateway is running on port ${PORT}`);
   });
