import errLogger from '../../utils/error-logger.js';

export default (err, req, res, _next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal server error';
  errLogger.error(err);

  res.status(err.statusCode).json({
    errorMessage: err.message,
    Error: err,
  });
};
