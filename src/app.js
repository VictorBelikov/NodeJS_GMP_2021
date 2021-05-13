import express from 'express';
import morgan from 'morgan';

import logger from './api/middlewares/logger.js';
import errorHandler from './api/middlewares/errorHandler.js';
import userRoutes from './api/routes/user.js';
import groupRoutes from './api/routes/group.js';

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logs request type to the console
app.use(morgan('dev'));
app.use(logger); // custom logger

// Routes
app.use('/user', userRoutes);
app.use('/group', groupRoutes);
app.use((req, res, next) => {
  const error = new Error('No such route found');
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);

export default app;
