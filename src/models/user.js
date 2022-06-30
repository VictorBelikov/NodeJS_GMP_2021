import { Sequelize } from 'sequelize';

import sequelize from '../data-access/sequelize.js';
import { TableNames } from '../config/db.js';

const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    login: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    age: { type: Sequelize.INTEGER, allowNull: false },
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  },
  { timestamps: false, tableName: TableNames.USER },
);

export default User;
