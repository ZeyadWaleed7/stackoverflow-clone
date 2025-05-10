const rateLimit = require('express-rate-limit');

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100;
const GOOGLE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const GOOGLE_MAX_REQUESTS = 20;

const authLimiter = rateLimit({
    windowMs: WINDOW_MS,
    max: MAX_REQUESTS,
    message: 'Too many requests from this IP, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
});

const googleAuthLimiter = rateLimit({
    windowMs: GOOGLE_WINDOW_MS,
    max: GOOGLE_MAX_REQUESTS,
    message: 'Too many Google authentication attempts, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
});

// Export configuration for testing
const config = {
    WINDOW_MS,
    MAX_REQUESTS,
    GOOGLE_WINDOW_MS,
    GOOGLE_MAX_REQUESTS
};

module.exports = {
    authLimiter,
    googleAuthLimiter,
    config
}; 