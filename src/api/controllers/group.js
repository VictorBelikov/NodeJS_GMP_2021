import Group from '../../models/group.js';
import UserGroup from '../../models/userGroup.js';
import GroupService from '../../services/groupService.js';
import errorService from '../../utils/errorService.js';

const groupService = new GroupService(Group, UserGroup);

const getGroupById = async (req) => {
  const { groupId } = req.params;
  const group = await groupService.getGroupById(groupId);
  if (!group) {
    throw errorService(404, `Could not find a group with id ${groupId}!`);
  }
  return group;
};

const getGroupByName = async (name) => {
  const group = groupService.getGroupByName(name);
  if (group) {
    throw errorService(400, `Group with name ${name} already exists in DB`);
  }
};

export const getAllGroups = async (req, res, next) => {
  try {
    const groups = await groupService.getAllGroups();
    if (groups.length < 0) {
      throw errorService(404, 'Could not find Groups in DB!');
    }
    return res.status(200).json({ message: 'Fetched groups successfully!', groups });
  } catch (err) {
    return next(err);
  }
};

export const getSpecificGroup = async (req, res, next) => {
  try {
    const group = await getGroupById(req);
    res.status(200).json({ message: 'Group fetched!', group });
  } catch (err) {
    return next(err);
  }
};

export const createGroup = async (req, res, next) => {
  try {
    const { name } = req.body;
    await getGroupByName(name, req);
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
    await getGroupByName(name, req);
    const status = await groupService.updateGroup(id, { name });
    if (!status[0]) {
      throw errorService(404, `Group with id ${id} doesn't exist`);
    }
    return res.status(200).json({ message: `Group with id ${id} sucessfully updated!` });
  } catch (err) {
    return next(err);
  }
};

export const deleteGroup = async (req, res, next) => {
  try {
    const group = await getGroupById(req);
    await groupService.deleteGroup(group);
    res.status(200).json({ message: 'Group deleted!', deltedGroup: group });
  } catch (err) {
    return next(err);
  }
};

export const addAccessToUsers = async (req, res, next) => {
  try {
    const userIds = req.body.users;
    const { groupId } = req.params;

    if (!Array.isArray(userIds)) {
      throw errorService(400, 'USERS must be an array of INT numbers');
    }
    const group = await getGroupById(req);
    await groupService.addUsersToGroup(userIds, groupId);
    res.status(200).json({ message: `Users with ids ${userIds} were added to the ${group.name.toUpperCase()} group` });
  } catch (err) {
    return next(err);
  }
};
