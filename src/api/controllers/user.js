import User from '../models/user.js';
import getAutoSuggestUsers from '../util/getAutoSuggestUsers.js';

export const getAllUsers = (req, res, next) => {
  try {
    const allUsers = User.fetchAll();
    if (allUsers.length > 0) {
      return res.status(200).json({
        message: 'Fetched users successfully!',
        totalUsers: allUsers,
      });
    }
    res.status(200).json({ message: 'No users in DB' });
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
    const { login, password, age } = req.body;
    const newUser = new User(login, password, age).save();
    res.status(201).json({
      message: 'User created successfully!',
      createdUser: newUser,
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
    const { login, password, age } = req.body;
    const updatedUser = User.update(+req.params.userId, new User(login, password, age));
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

export const suggestedUserList = (req, res, next) => {
  let { limit, substr } = req.query;
  substr = substr || '';
  limit = limit ? +limit : 0;

  try {
    const allUsers = User.fetchAll();
    if (allUsers.length > 0) {
      const listOfUsers = getAutoSuggestUsers(substr, limit, allUsers);
      return res.status(200).json({ message: 'Fetched users successfully!', listOfUsers });
    }
    const error = new Error('Could not find Users in DB!');
    error.statusCode = 404;
    throw error;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return next(err);
  }
};
