import pg from 'pg';

import { db, TableNames } from '../config/db.js';

const client = new pg.Client(db);

export default async () => {
  try {
    await client.connect();

    await client.query(`
      CREATE TABLE IF NOT EXISTS ${TableNames.USER} (
        id serial PRIMARY KEY,
        login VARCHAR (255) UNIQUE NOT NULL,
        password VARCHAR (255) NOT NULL,
        age INT NOT NULL,
        "isDeleted" BOOLEAN NOT NULL DEFAULT false
      )
    `);

    const { rows } = await client.query(`SELECT * FROM ${TableNames.USER}`);

    if (rows.length === 0) {
      await client.query(`
      INSERT INTO users (login, password, age)
      VALUES
        ('login1', 'pass1', 21),
        ('login2', 'pass2', 22),
        ('login3', 'pass3', 23),
        ('login4', 'pass4', 24),
        ('login5', 'pass5', 25)
    `);
    }
  } catch (err) {
    console.error('Error running SQL query', err);
  } finally {
    await client.end();
  }
};
