export const db = {
  database: process.env.DB || 'users',
  user: process.env.USER || 'default_user',
  password: process.env.PASSWORD || '',
  host: process.env.HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
};

export const dbDialect = 'postgres';

export const TableNames = {
  USER: 'users',
  GROUP: 'groups',
  USER_GROUPS: 'userGroups',
};
