const Server = require('./Server');
const Database = require('./Database');
const configServer = require('../config/server');
const configDB = require('../config/database');

const server = new Server(configServer.port, configServer.publicDir);
server.start();

const db = new Database(configDB.serviceAccount, configDB.databaseName);

// TEST: add contributions
// for (var i = 0; i < 10; i++) {
//   let date = new Date(Math.floor(Math.random() * 2020), Math.floor(Math.random() * 12, Math.floor(Math.random() * 30)));
//   db.saveContribution({
//     author: 'jojo-' + i,
//     image: 'lalala',
//     url: 'tototot',
//     date: date.toJSON()
//   });
// }

// TEST: retrieve contributions
// db.getContributionsOfDay('1791-01-31T23:00:00.000Z', (contribs) => {
//   console.log(contribs);
// });
