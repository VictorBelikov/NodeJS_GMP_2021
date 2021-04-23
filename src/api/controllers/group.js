import Group from '../../models/group.js';
import GroupService from '../../services/groupService.js';

const groupService = new GroupService(Group);

export const getAllGroups = async (req, res, next) => {
  try {
    const allGroups = await groupService.getAllGroups();
    return res.status(200).json(allGroups);
  } catch (err) {
    return next(err);
  }
};

export const getSpecificGroup = async (req, res, next) => {
  try {
    const group = await groupService.getGroup(req.params.groupId);
    res.status(200).json(group);
  } catch (err) {
    return next(err);
  }
};

export const createGroup = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newGroup = await groupService.createGroup({ name });
    res.status(201).json(newGroup);
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
    res.status(200).json(group);
  } catch (err) {
    return next(err);
  }
};
