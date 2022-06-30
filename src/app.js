import express from 'express';

import cors from './api/middlewares/cors.js';
import serviceLogger from './api/middlewares/serviceLogger.js';
import errorHandler from './api/middlewares/errorHandler.js';
import userRoutes from './api/routes/user.js';
import groupRoutes from './api/routes/group.js';
import authRoutes from './api/routes/auth.js';
import checkAuth from './api/middlewares/checkAuth.js';

const app = express();

// Logs request type to the console
app.use(serviceLogger);

app.use(cors);

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/user', checkAuth, userRoutes);
app.use('/group', checkAuth, groupRoutes);
app.use('/auth', authRoutes);
app.use((req, res, next) => {
  const error = new Error('No such route found');
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);

export default app;
