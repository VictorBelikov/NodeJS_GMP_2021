import Group from '../../models/group.js';
import User from '../../models/user.js';
import GroupService from '../../services/groupService.js';
import UserService from '../../services/userService.js';
import addUsersToGroup from '../../utils/addUsersToGroup.js';

const userService = new UserService(User);
const groupService = new GroupService(Group);

export const getAllGroups = async (req, res, next) => {
  try {
    const groups = await groupService.getAllGroups();
    return res.status(200).json({ message: 'Fetched groups successfully!', groups });
  } catch (err) {
    return next(err);
  }
};

export const getSpecificGroup = async (req, res, next) => {
  try {
    const group = await groupService.getGroupById(req.params.groupId);
    res.status(200).json({ message: 'Group fetched!', group });
  } catch (err) {
    return next(err);
  }
};

export const createGroup = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newGroup = await groupService.createGroup({ name });
    res.status(201).json({ message: 'Group created successfully!', createdGroup: newGroup });
  } catch (err) {
    return next(err);
  }
};

export const updateGroup = async (req, res, next) => {
  try {
    const { name } = req.body;
    const id = req.params.groupId;
    await groupService.updateGroup(id, { name });
    return res.status(200).json({ message: `Group with id ${id} sucessfully updated!` });
  } catch (err) {
    return next(err);
  }
};

export const deleteGroup = async (req, res, next) => {
  try {
    const group = await groupService.deleteGroup(req.params.groupId);
    res.status(200).json({ message: 'Group deleted!', deltedGroup: group });
  } catch (err) {
    return next(err);
  }
};

export const addAccessRightsToUsers = async (req, res, next) => {
  try {
    const group = await addUsersToGroup(req.body.users, req.params.groupId, userService, groupService);
    res.status(200).json({ message: `Users were added to the ${group.name.toUpperCase()} group` });
  } catch (err) {
    return next(err);
  }
};
