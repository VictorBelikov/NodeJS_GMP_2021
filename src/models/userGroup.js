import { Sequelize } from 'sequelize';

import sequelize from '../data-access/sequelize.js';
import { TableNames } from '../config/db.js';

const UserGroup = sequelize.define(
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

export default UserGroup;
