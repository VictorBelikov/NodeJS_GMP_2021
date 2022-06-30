import logger from '../../utils/logger.js';

export default (err, req, res, _next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal server error';
  logger.error(err);

  res.status(err.statusCode).json({
    errorMessage: err.message,
    Error: err,
  });
};
