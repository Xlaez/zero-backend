import rateLimiter from 'express-rate-limiter';

const appRateLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 20,
  skipSuccessfulRequests: true,
});

export default appRateLimiter;
