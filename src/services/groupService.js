import { validate as uuidValidate } from 'uuid';

import errorService from '../api/controllers/errorService.js';
import sequelize from '../data-access/sequelize.js';

export default class GroupService {
  constructor(groupModel, userGroupModel) {
    this.groupModel = groupModel;
    this.userGroupModel = userGroupModel;
  }

  async _checkGroupByName(newName) {
    const group = await this.groupModel.findOne({ where: { name: newName } });
    if (group) {
      throw errorService(400, `Group with name ${newName} already exists in DB`);
    }
  }

  async getAllGroups() {
    return this.groupModel.findAll();
  }

  async getGroupById(groupId) {
    return uuidValidate(groupId) ? this.groupModel.findByPk(groupId) : false;
  }

  async createGroup(groupInfo) {
    await this._checkGroupByName(groupInfo.name);
    return this.groupModel.create(groupInfo);
  }

  async updateGroup(id, groupInfo) {
    await this._checkGroupByName(groupInfo.name);
    return uuidValidate(id) ? this.groupModel.update(groupInfo, { where: { id } }) : [];
  }

  // eslint-disable-next-line class-methods-use-this
  async deleteGroup(group) {
    await group.destroy(); // Hard delete
  }

  async addUsersToGroup(userIds, groupId) {
    const rows = userIds.map((userId) => ({ userId, groupId }));
    return sequelize.transaction(async () => this.userGroupModel.bulkCreate(rows, { returning: true }));
  }
}
