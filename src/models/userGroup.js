import { Sequelize } from 'sequelize';

import sequelize from '../data-access/sequelize.js';
import { TableNames } from '../config/db.js';
import User from './user.js';
import Group from './group.js';

class UserGroup {
  constructor() {
    this.UserGroupModel = sequelize.define(
      'userGroup',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
      },
      { timestamps: false, tableName: TableNames.USER_GROUPS },
    );

    // Set DB relationships
    User.belongsToMany(Group, { through: this.UserGroupModel, constraints: true, onDelete: 'CASCADE' });
    Group.belongsToMany(User, { through: this.UserGroupModel, constraints: true, onDelete: 'CASCADE' });
  }
}

export default new UserGroup().UserGroupModel;
