const rateLimit = require('express-rate-limit');

// General rate limiter: 10 requests per minute per IP
const generalLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100,
    message: { message: 'Too many requests, please try again later.' }
});

module.exports = generalLimiter;
