import 'babel-polyfill';

import User from '../src/models/user.js';
import {
  getAllUsers,
  getSpecificUser,
  createUser,
  updateUser,
  deleteUser,
  suggestedUserList,
  userService,
} from '../src/api/controllers/user.js';
import { mockUsers, mockUser, mockCreatedUser } from '../__mocks__/mockUserData.js';
import errorService from '../src/utils/errorService.js';

jest.mock('../src/utils/errorService.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('UserController', () => {
  const req = {};
  const res = {};
  const next = jest.fn();

  beforeEach(() => {
    req.body = {};
    req.query = {};
    req.params = {};

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
  });

  beforeAll(() => {
    User.findAll = jest.fn().mockReturnValue(Promise.resolve(mockUsers));
    User.findByPk = jest.fn().mockReturnValue(Promise.resolve(mockUser));
    User.create = jest.fn().mockReturnValue(Promise.resolve(mockCreatedUser));
    User.update = jest.fn().mockReturnValue(Promise.resolve([1]));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return all users and send 200 status code', async () => {
      const getAllUsersStub = jest.spyOn(userService, 'getAllUsers');
      await getAllUsers(req, res, next);
      expect(getAllUsersStub).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Fetched users successfully!', users: mockUsers });
    });

    it('should call "errorService" if all users array length <= 0', async () => {
      jest.spyOn(userService, 'getAllUsers').mockReturnValue([]);
      await getAllUsers(req, res, next);
      expect(errorService).toHaveBeenCalledWith(404, 'Could not find Users in DB!');
    });
  });

  describe('getSpecificUser', () => {
    it('should return a specific user by Id and send 200 status code', async () => {
      const getUserByIdStub = jest.spyOn(userService, 'getUserById');
      req.params = { userId: '77' };
      await getSpecificUser(req, res, next);
      expect(getUserByIdStub).toHaveBeenCalledWith(+req.params.userId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User fetched!', user: mockUser });
    });

    it('should call "errorService" if specific user with provided Id does not exist', async () => {
      jest.spyOn(userService, 'getUserById').mockReturnValue(undefined);
      req.params = { userId: 'someId' };
      await getSpecificUser(req, res, next);
      expect(errorService).toHaveBeenCalledWith(404, `Could not find a user with id ${req.params.userId}!`);
    });
  });

  describe('createUser', () => {
    let createUserStub;
    let getUserByLoginStub;

    const help = async (value) => {
      createUserStub = jest.spyOn(userService, 'createUser');
      getUserByLoginStub = jest.spyOn(userService, 'getUserByLogin').mockReturnValue(value);
      req.body = { login: 'login1', password: 'pass1', age: 26 };
      await createUser(req, res, next);
    };

    it('should create and return user', async () => {
      await help(undefined);
      expect(createUserStub).toHaveBeenCalledWith(req.body);
      expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully!', createdUser: mockCreatedUser });
    });

    it('should send 201 status code if user successfully created', async () => {
      await help(undefined);
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should call "getUserByLogin" with specific login', async () => {
      await help(undefined);
      expect(getUserByLoginStub).toHaveBeenCalledWith(req.body.login);
    });

    it('should call "errorService" if user with provided login already exists', async () => {
      await help({});
      expect(errorService).toHaveBeenCalledWith(400, `User with login ${req.body.login} already exists in DB`);
    });
  });

  describe('updateUser', () => {
    let updateUserStub;
    let getUserByLoginStub;

    const help = async (idValue, loginValue) => {
      updateUserStub = jest.spyOn(userService, 'updateUser').mockReturnValue(idValue);
      getUserByLoginStub = jest.spyOn(userService, 'getUserByLogin').mockReturnValue(loginValue);
      req.params = { userId: '77' };
      req.body = { login: 'login1', password: 'pass1', age: 26 };
      await updateUser(req, res, next);
    };

    it('should update user and send confirmation message', async () => {
      await help([1], undefined);
      expect(updateUserStub).toHaveBeenCalledWith(+req.params.userId, req.body);
      expect(res.json).toHaveBeenCalledWith({ message: `User with id ${req.params.userId} sucessfully updated!` });
    });

    it('should send 200 status code if user successfully updated', async () => {
      await help([1], undefined);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should call "getUserByLogin" with specific login', async () => {
      await help([1], undefined);
      expect(getUserByLoginStub).toHaveBeenCalledWith(req.body.login);
    });

    it('should call "errorService" if specific user with provided Id does not exist', async () => {
      await help([0], undefined);
      expect(errorService).toHaveBeenCalledWith(404, `User with id ${req.params.userId} doesn't exist`);
    });

    it('should call "errorService" if user with provided login already exists', async () => {
      await help([1], {});
      expect(errorService).toHaveBeenCalledWith(400, `User with login ${req.body.login} already exists in DB`);
    });
  });

  describe('deleteUser', () => {
    let deleteUserStub;

    const help = async (value) => {
      deleteUserStub = jest.spyOn(userService, 'deleteUser').mockReturnValue(value);
      req.params = { userId: '77' };
      await deleteUser(req, res, next);
    };

    it('should delete user and send confirmation message', async () => {
      await help([1]);
      expect(deleteUserStub).toHaveBeenCalledWith(+req.params.userId);
      expect(res.json).toHaveBeenCalledWith({ message: `User with id ${req.params.userId} sucessfully deleted!` });
    });

    it('should send 200 status code if user successfully deleted', async () => {
      await help([1]);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should call "errorService" if specific user with provided Id does not exist', async () => {
      await help([0]);
      expect(errorService).toHaveBeenCalledWith(404, `User with id ${req.params.userId} doesn't exist`);
    });
  });

  describe('suggestedUserList', () => {
    it('should return suggested users, send confirmation message and status code', async () => {
      const getAutoSuggestUsersStub = jest.spyOn(userService, 'getAutoSuggestUsers').mockResolvedValue(mockUsers);
      req.query = { limit: '3', substr: 'log' };
      const list = await suggestedUserList(req, res, next);
      expect(getAutoSuggestUsersStub).toHaveBeenCalledWith(req.query.substr, +req.query.limit)
      expect(res.json).toHaveBeenCalledWith({ message: 'Fetched users successfully!', listOfUsers: mockUsers });
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
