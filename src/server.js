import http from 'http';

import sequelize from './data-access/sequelize.js';
import fillDb from './data-access/fillDb.js';
import app from './app.js';
import logger from './utils/logger.js';

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
    server.listen(
      port,
      () => console.log(`Server is listening on port ${port}; process.version is ${process.version}`),
      logger.info('some error on start'),
    );
  } catch (e) {
    console.error('Connection error: ', e);
  }
})();

process
  .on('unhandledRejection', (reason, _promise) => {
    logger.error(reason);
  })
  .on('uncaughtException', (err) => {
    logger.error(err);
    process.exit(1);
  });
