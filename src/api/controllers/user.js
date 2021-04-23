import User from '../../models/user.js';
import getAutoSuggestUsers from '../../utils/getAutoSuggestUsers.js';
import UserService from '../../services/userService.js';

const userService = new UserService(User);

export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await userService.getAllUsers();
    return res.status(200).json(allUsers);
  } catch (err) {
    return next(err);
  }
};

export const getSpecificUser = async (req, res, next) => {
  try {
    const user = await userService.getUser(+req.params.userId);
    res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { login, password, age } = req.body;
    const newUser = await userService.createUser({ login, password, age });
    res.status(201).json(newUser);
  } catch (err) {
    return next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { login, password, age } = req.body;
    await userService.updateUser(+req.params.userId, { login, password, age });
    return res.status(200).json({ message: `User with id ${+req.params.userId} sucessfully updated!` });
  } catch (err) {
    return next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = +req.params.userId;
    await userService.deleteUser(id);
    res.status(200).json({ message: `User with id ${id} sucessfully deleted!` });
  } catch (err) {
    return next(err);
  }
};

export const suggestedUserList = async (req, res, next) => {
  let { limit, substr } = req.query;
  substr = substr || '';
  limit = limit ? +limit : 0;

  try {
    const { users } = await userService.getAllUsers();
    const listOfUsers = getAutoSuggestUsers(substr, limit, users);
    return res.status(200).json({ message: 'Fetched users successfully!', listOfUsers });
  } catch (err) {
    return next(err);
  }
};
