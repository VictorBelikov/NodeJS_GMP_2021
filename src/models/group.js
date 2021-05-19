import { Sequelize } from 'sequelize';

import sequelize from '../data-access/sequelize.js';
import { TableNames } from '../config/db.js';

const Group = sequelize.define(
  'group',
  {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: { type: Sequelize.STRING, allowNull: false },
    permissions: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: false,
      defaultValue: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD'],
    },
  },
  { timestamps: false, tableName: TableNames.GROUP },
);

export default Group;
