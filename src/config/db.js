export const db = {
  database: process.env.DB || 'iewvtawo',
  user: process.env.USER || 'iewvtawo',
  password: process.env.PASSWORD || '8tK8FGY6QjzZEAv0vztZWrCa30RE0FRq',
  host: process.env.HOST || 'hattie.db.elephantsql.com',
  port: Number(process.env.DB_PORT) || 5432,
};

export const dbDialect = 'postgres';

export const TableNames = {
  USER: 'users',
  GROUP: 'groups',
  USER_GROUPS: 'userGroups',
};
