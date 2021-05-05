import { Sequelize } from 'sequelize';
import { createNamespace } from 'cls-hooked';

import { db, dbDialect } from '../config/db.js';

const transactionNamespace = createNamespace('transaction-namespace');
Sequelize.useCLS(transactionNamespace);

const sequelize = new Sequelize(db.database, db.user, db.password, {
  dialect: dbDialect,
  host: db.host,
});

export default sequelize;
