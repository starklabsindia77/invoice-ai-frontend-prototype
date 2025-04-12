
const logger = require('../utils/logger');
const Sentry = require('@sentry/node');

/**
 * Custom error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userId: req.user ? req.user.id : 'unauthenticated'
  });

  // Capture exception in Sentry
  Sentry.captureException(err);

  // Determine status code
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

module.exports = { errorHandler };
