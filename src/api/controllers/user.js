import User from '../../models/user.js';
import getAutoSuggestUsers from '../../utils/getAutoSuggestUsers.js';
import UserService from '../../services/userService.js';

export const getAllUsers = (req, res, next) => {
  try {
    const userService = new UserService(User);
    const allUsers = userService.getAllUsers();

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
    const userService = new UserService(User);
    const user = userService.getUserById(+req.params.userId);
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
    const userService = new UserService(User);
    const newUser = userService.createUser(login, password, age);

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
    const userService = new UserService(User);
    const user = userService.getUserById(+req.params.userId);

    if (!user) {
      const error = new Error('Could not find a user!');
      error.statusCode = 404;
      throw error;
    }
    const { login, password, age } = req.body;
    const updatedUser = userService.updateUser(+req.params.userId, login, password, age);
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
    const userService = new UserService(User);
    const user = userService.deleteUser(+req.params.userId);

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
    const userService = new UserService(User);
    const allUsers = userService.getAllUsers();

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
