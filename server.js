const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('./users/usersRouter.js');
const imagesRouter = require('./images/imagesRouter.js');

const server = express();

server.use([ helmet(), express.json(), cors() ]);
server.use('/users', usersRouter);
server.use('/images', imagesRouter);

module.exports = server;