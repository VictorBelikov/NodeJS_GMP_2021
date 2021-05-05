import { validate as uuidValidate } from 'uuid';

import errorService from '../api/controllers/errorService.js';

export default class GroupService {
  constructor(groupModel) {
    this.groupModel = groupModel;
  }

  async _checkGroupByName(newName) {
    const group = await this.groupModel.findOne({ where: { name: newName } });
    if (group) {
      throw errorService(400, `Group with name ${newName} already exists in DB`);
    }
  }

  async getAllGroups() {
    const groups = await this.groupModel.findAll();
    if (groups.length > 0) {
      return groups;
    }
    throw errorService(404, 'Could not find Groups in DB!');
  }

  async getGroupById(groupId) {
    const group = uuidValidate(groupId) ? await this.groupModel.findByPk(groupId) : false;
    if (!group) {
      throw errorService(404, `Could not find a group with id ${groupId}!`);
    }
    return group;
  }

  async createGroup(groupInfo) {
    await this._checkGroupByName(groupInfo.name);
    return this.groupModel.create(groupInfo);
  }

  async updateGroup(id, groupInfo) {
    await this._checkGroupByName(groupInfo.name);
    const status = uuidValidate(id) ? await this.groupModel.update(groupInfo, { where: { id } }) : [];
    if (!status[0]) {
      throw errorService(404, `Group with id ${id} doesn't exist`);
    }
  }

  async deleteGroup(groupId) {
    const group = await this.getGroupById(groupId);
    await group.destroy(); // Hard delete
    return group;
  }
}
