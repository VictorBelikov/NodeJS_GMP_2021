import express from 'express';
import morgan from 'morgan';

import userRoutes from './api/routes/user.js';

const app = express();

// Logs request type to the console
app.use(morgan('dev'));

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/user', userRoutes);
app.use((req, res, next) => {
  const error = new Error('No such route found');
  error.status = 404;
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log('Global error handler:\n', err);
  res.status(err.statusCode || 500).json({
    errorMessage: err.message,
    status: err.statusCode,
    error: err,
  });
});

export default app;
