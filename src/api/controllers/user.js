import User from '../models/user';

export const getAllUsers = (req, res) => {
  console.log('Getting all users');
};

export const getSpecificUser = (req, res) => {
  console.log('Getting a specific user');
};

export const createUser = (req, res, next) => {
  try {
    const newUser = new User(req.body.login, req.body.password, req.body.age).save();
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

export const updateUser = (req, res) => {
  console.log('Updating user');
};

export const deleteUser = (req, res) => {
  console.log('Delteting user');
};
