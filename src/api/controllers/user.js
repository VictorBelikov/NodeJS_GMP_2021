import jwt from 'jsonwebtoken';

import User from '../../models/user.js';
import UserService from '../../services/userService.js';
import errorService from '../../utils/errorService.js';

const userService = new UserService(User);

const checkUserByLogin = async (login) => {
  const user = await userService.getUserByLogin(login);
  if (user) {
    throw errorService(400, `User with login ${login} already exists in DB`);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    if (users.length < 0) {
      throw errorService(404, 'Could not find Users in DB!');
    }
    return res.status(200).json({ message: 'Fetched users successfully!', users });
  } catch (err) {
    return next(err);
  }
};

export const getSpecificUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUserById(+userId);
    if (!user) {
      throw errorService(404, `Could not find a user with id ${userId}!`);
    }
    res.status(200).json({ message: 'User fetched!', user });
  } catch (err) {
    return next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { login, password, age } = req.body;
    await checkUserByLogin(login, req);
    const newUser = await userService.createUser({ login, password, age });
    res.status(201).json({ message: 'User created successfully!', createdUser: newUser });
  } catch (err) {
    return next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { login, password, age } = req.body;
    const { userId } = req.params;
    await checkUserByLogin(login, req);
    const status = await userService.updateUser(+userId, { login, password, age });
    if (!status[0]) {
      throw errorService(404, `User with id ${userId} doesn't exist`);
    }
    return res.status(200).json({ message: `User with id ${userId} sucessfully updated!` });
  } catch (err) {
    return next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const status = await userService.deleteUser(+userId);
    if (!status[0]) {
      throw errorService(404, `User with id ${userId} doesn't exist`);
    }
    res.status(200).json({ message: `User with id ${userId} sucessfully deleted!` });
  } catch (err) {
    return next(err);
  }
};

export const suggestedUserList = async (req, res, next) => {
  let { limit, substr } = req.query;
  substr = substr || '';
  limit = limit ? +limit : 0;

  try {
    const listOfUsers = await userService.getAutoSuggestUsers(substr, limit);
    return res.status(200).json({ message: 'Fetched users successfully!', listOfUsers });
  } catch (err) {
    return next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const user = await userService.getUserByLogin(login);
    if (!user) {
      throw errorService(401, `User with login '${login}' doesn't exist`);
    }
    if (password !== user.password) {
      throw errorService(401, 'Incorrect password!');
    }
    const token = jwt.sign({ userId: user.id.toString(), login, password }, process.env.JWT_KEY, { expiresIn: '1h' });
    res.status(200).json({ token, user });
  } catch (err) {
    return next(err);
  }
};
