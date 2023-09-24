const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes');
const errorControllerHandler = require('./middleware/errorControllerHandler');

function init() {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  const corsOptions = {
    origin: `http://${process.env.CLIENT_BASE_URL}:${process.env.CLIENT_PORT}`,
  };
  app.use(cors(corsOptions));
  router.loadRoutes(app);
  // Used for having a generic error treatment for every controllers
  app.use(errorControllerHandler);
  return app;
}

exports.start = () => new Promise((resolve, reject) => {
  const server = http.createServer(init());
  const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (Number.isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };
  const port = normalizePort(process.env.PORT || '3000');

  const errorHandler = (error) => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges.`);
        reject(error);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use.`);
        reject(error);
        break;
      default:
        reject(error);
    }
  };

  server.on('error', errorHandler);
  server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? `pipe ${address}` : `port ${port}`;
    // eslint-disable-next-line no-console
    console.log(`Listening on ${bind}`);
    resolve(true);
  });

  server.listen(port);
});
