import { Sequelize } from 'sequelize';

import { db, dbDialect } from '../config/db.js';

const sequelize = new Sequelize(db.database, db.user, db.password, {
  dialect: dbDialect,
  host: db.host,
});

export default sequelize;
