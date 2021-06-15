import { validate as uuidValidate } from 'uuid';

import sequelize from '../data-access/sequelize.js';

export default class GroupService {
  constructor(groupModel, userGroupModel) {
    this.groupModel = groupModel;
    this.userGroupModel = userGroupModel;
  }

  async getGroupByName(newName) {
    return this.groupModel.findOne({ where: { name: newName } });
  }

  async getAllGroups() {
    return this.groupModel.findAll();
  }

  async getGroupById(groupId) {
    return uuidValidate(groupId) ? this.groupModel.findByPk(groupId) : false;
  }

  async createGroup(groupInfo) {
    return this.groupModel.create(groupInfo);
  }

  async updateGroup(id, groupInfo) {
    return uuidValidate(id) ? this.groupModel.update(groupInfo, { where: { id } }) : [];
  }

  async deleteGroup(id) {
    return uuidValidate(id) ? this.groupModel.destroy({ where: { id } }) : []; // Hard delete
  }

  async addUsersToGroup(userIds, groupId) {
    const rows = userIds.map((userId) => ({ userId, groupId }));
    return sequelize.transaction(async () => this.userGroupModel.bulkCreate(rows, { returning: true }));
  }
}
