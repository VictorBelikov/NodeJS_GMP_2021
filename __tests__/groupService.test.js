import 'babel-polyfill';

import Group from '../src/models/group.js';
import {
  getAllGroups,
  getSpecificGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  groupService,
} from '../src/api/controllers/group.js';
import { mockGroups, mockGroup, mockCreatedGroup } from '../__mocks__/mockGroupData.js';
import errorService from '../src/utils/errorService.js';

jest.mock('../src/utils/errorService.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('uuid', () => ({
  ...jest.mock('uuid'),
  validate: jest.fn().mockReturnValue(true),
}));

describe('GroupController', () => {
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
    Group.findAll = jest.fn().mockReturnValue(Promise.resolve(mockGroups));
    Group.findByPk = jest.fn().mockReturnValue(Promise.resolve(mockGroup));
    Group.create = jest.fn().mockReturnValue(Promise.resolve(mockCreatedGroup));
    Group.update = jest.fn().mockReturnValue(Promise.resolve([1]));
    Group.destroy = jest.fn().mockReturnValue(Promise.resolve([1]));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllGroups', () => {
    it('should return all groups and send 200 status code', async () => {
      const getAllGroupsStub = jest.spyOn(groupService, 'getAllGroups');
      await getAllGroups(req, res, next);
      expect(getAllGroupsStub).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Fetched groups successfully!', groups: mockGroups });
    });

    it('should call "errorService" if all groups array length <= 0', async () => {
      jest.spyOn(groupService, 'getAllGroups').mockReturnValue([]);
      await getAllGroups(req, res, next);
      expect(errorService).toHaveBeenCalledWith(404, 'Could not find Groups in DB!');
    });
  });

  describe('getSpecificGroup', () => {
    it('should return a specific group by Id and send 200 status code', async () => {
      const getGroupByIdStub = jest.spyOn(groupService, 'getGroupById');
      req.params = { groupId: '77' };
      await getSpecificGroup(req, res, next);
      expect(getGroupByIdStub).toHaveBeenCalledWith(req.params.groupId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Group fetched!', group: mockGroup });
    });

    it('should call "errorService" if specific group with provided Id does not exist', async () => {
      jest.spyOn(groupService, 'getGroupById').mockReturnValue(undefined);
      req.params = { groupId: 'someId' };
      await getSpecificGroup(req, res, next);
      expect(errorService).toHaveBeenCalledWith(404, `Could not find a group with id ${req.params.groupId}!`);
    });
  });

  describe('createGroup', () => {
    let createGroupStub;
    let getGroupByNameStub;

    const help = async (value) => {
      createGroupStub = jest.spyOn(groupService, 'createGroup');
      getGroupByNameStub = jest.spyOn(groupService, 'getGroupByName').mockReturnValue(value);
      req.body = { name: 'guests' };
      await createGroup(req, res, next);
    };

    it('should create and return group', async () => {
      await help(undefined);
      expect(createGroupStub).toHaveBeenCalledWith(req.body);
      expect(res.json).toHaveBeenCalledWith({ message: 'Group created successfully!', createdGroup: mockCreatedGroup });
    });

    it('should send 201 status code if group successfully created', async () => {
      await help(undefined);
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should call "getGroupByName" with specific group name', async () => {
      await help(undefined);
      expect(getGroupByNameStub).toHaveBeenCalledWith(req.body.name);
    });

    it('should call "errorService" if group with provided name already exists', async () => {
      await help({});
      expect(errorService).toHaveBeenCalledWith(400, `Group with name ${req.body.name} already exists in DB`);
    });
  });

  describe('updateGroup', () => {
    let updateGroupStub;
    let getGroupByNameStub;

    const help = async (idValue, loginValue) => {
      updateGroupStub = jest.spyOn(groupService, 'updateGroup').mockReturnValue(idValue);
      getGroupByNameStub = jest.spyOn(groupService, 'getGroupByName').mockReturnValue(loginValue);
      req.params = { groupId: '77' };
      req.body = { name: 'guests' };
      await updateGroup(req, res, next);
    };

    it('should update group and send confirmation message', async () => {
      await help([1], undefined);
      expect(updateGroupStub).toHaveBeenCalledWith(req.params.groupId, req.body);
      expect(res.json).toHaveBeenCalledWith({ message: `Group with id ${req.params.groupId} sucessfully updated!` });
    });

    it('should send 200 status code if group successfully updated', async () => {
      await help([1], undefined);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should call "getGroupByName" with specific group name', async () => {
      await help([1], undefined);
      expect(getGroupByNameStub).toHaveBeenCalledWith(req.body.name);
    });

    it('should call "errorService" if specific group with provided Id does not exist', async () => {
      await help([0], undefined);
      expect(errorService).toHaveBeenCalledWith(404, `Group with id ${req.params.groupId} doesn't exist`);
    });

    it('should call "errorService" if group with provided group name already exists', async () => {
      await help([1], {});
      expect(errorService).toHaveBeenCalledWith(400, `Group with name ${req.body.name} already exists in DB`);
    });
  });

  describe('deleteGroup', () => {
    let deleteGroupStub;

    const help = async (value) => {
      deleteGroupStub = jest.spyOn(groupService, 'deleteGroup').mockReturnValue(value);
      req.params = { groupId: '77' };
      await deleteGroup(req, res, next);
    };

    it('should update group and send confirmation message', async () => {
      await help([1]);
      expect(deleteGroupStub).toHaveBeenCalledWith(req.params.groupId);
      expect(res.json).toHaveBeenCalledWith({ message: `Group with id ${req.params.groupId} sucessfully deleted!` });
    });

    it('should send 200 status code if group successfully deleted', async () => {
      await help([1]);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should call "errorService" if specific group with provided Id does not exist', async () => {
      await help([0]);
      expect(errorService).toHaveBeenCalledWith(404, `Group with id ${req.params.groupId} doesn't exist`);
    });
  });
});
