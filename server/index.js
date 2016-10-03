const Server = require('./Server');
const configServer = require('../config/server');

const server = new Server(configServer.port, configServer.publicDir);
server.start();
