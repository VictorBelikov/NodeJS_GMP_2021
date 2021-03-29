import http from 'http';

import app from './app.js';

const port = Number(process.env.PORT) || 3000;
const server = http.createServer(app);

server.listen(port, () => console.log(`Server is listening on port ${port}; process.version is ${process.version}`));
