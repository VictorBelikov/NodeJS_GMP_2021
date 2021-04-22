import http from 'http';

import sequelize from './data-access/sequelize.js';
import fillDb from './utils/fillDb.js';
import app from './app.js';

(async () => {
  try {
    // Run SQL script which will create 'users' table in the DB and fill it in with predefined users collection
    await fillDb();

    // Test if the connection to DB is OK
    await sequelize.authenticate();

    // Synchronize all models. Create the table if it doesn't exist & do nothing if it already exists
    await sequelize.sync({ force: false });

    const port = Number(process.env.APP_PORT) || 3000;
    const server = http.createServer(app);
    server.listen(port, () => console.log(`Server is listening on port ${port}; process.version is ${process.version}`));
  } catch (e) {
    console.error('Connection error: ', e);
  }
})();
