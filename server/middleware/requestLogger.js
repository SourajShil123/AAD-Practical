/**
 * Request Logger Middleware
 * Logs incoming HTTP method, URL, and timestamp to the console,
 * then calls next() to pass control to the next middleware/handler.
 */
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl || req.url}`);
  next();
};

module.exports = requestLogger;
