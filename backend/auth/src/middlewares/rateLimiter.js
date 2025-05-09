const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
});

const googleAuthLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20, // Limit each IP to 5 Google auth attempts per hour
    message: 'Too many Google authentication attempts, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    authLimiter,
    googleAuthLimiter
}; 