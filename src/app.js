import express from 'express';
import morgan from 'morgan';

import userRoutes from './api/routes/user.js';
import groupRoutes from './api/routes/group.js';
import User from './models/user.js';
import Group from './models/group.js';
import UserGroup from './models/userGroup.js';

const app = express();

// Logs request type to the console
app.use(morgan('dev'));

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/user', userRoutes);
app.use('/group', groupRoutes);
app.use((req, res, next) => {
  const error = new Error('No such route found');
  error.statusCode = 404;
  next(error);
});

// Set DB relationships
User.belongsToMany(Group, { through: UserGroup, constraints: true, onDelete: 'CASCADE' });
Group.belongsToMany(User, { through: UserGroup, constraints: true, onDelete: 'CASCADE' });

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
