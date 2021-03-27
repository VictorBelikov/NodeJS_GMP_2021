import User from '../models/user.js';

export const getAllUsers = (req, res, next) => {
  try {
    const allUsers = User.fetchAll();
    res.status(200).json({
      message: 'Fetched users successfully!',
      totalUsers: allUsers
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return next(err);
  }
};

export const getSpecificUser = (req, res, next) => {
  try {
    const user = User.findById(+req.params.userId);
    if (!user) {
      const error = new Error('Could not find a user!');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'User fetched!', user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return next(err);
  }
};

export const createUser = (req, res, next) => {
  try {
    const newUser = new User(req.body.login, req.body.password, req.body.age).save();
    res.status(201).json({
      message: 'User created successfully!',
      createdUser: newUser
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return next(err);
  }
};

export const updateUser = (req, res, next) => {
  try {
    const user = User.findById(+req.params.userId);
    if (!user) {
      const error = new Error('Could not find a user!');
      error.statusCode = 404;
      throw error;
    }
    const updatedUser = User.update(+req.params.userId, new User(req.body.login, req.body.password, req.body.age));
    res.status(200).json({ message: 'User updated!', updatedUser });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return next(err);
  }
};

export const deleteUser = (req, res, next) => {
  try {
    const user = User.delete(+req.params.userId);
    if (!user) {
      const error = new Error('Could not find a user!');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'User deleted!', user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return next(err);
  }
};
