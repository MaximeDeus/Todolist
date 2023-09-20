require('dotenv').config(); // load var from .env file
const server = require('./server');

(async () => {
  try {
    await server.start();
  } catch (error) {
    console.error('Unable to start the server :', error);
    process.exit(1);
  }
})();
