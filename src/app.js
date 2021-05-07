import express from 'express';
import morgan from 'morgan';

import logger from './api/middlewares/logger.js';
import userRoutes from './api/routes/user.js';
import groupRoutes from './api/routes/group.js';

const app = express();

// Logs request type to the console
app.use(morgan('dev'));

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// custom logger
app.use(logger);

// Routes
app.use('/user', userRoutes);
app.use('/group', groupRoutes);
app.use((req, res, next) => {
  const error = new Error('No such route found');
  error.statusCode = 404;
  next(error);
});

app.use((err, req, res, _next) => {
  console.log('!! Global error handler !!\n', err);
  const status = err.statusCode || 500;

  res.status(status).json({
    message: err.message || 'Internal server error',
    status,
    fullErrorObject: err,
  });
});

export default app;
