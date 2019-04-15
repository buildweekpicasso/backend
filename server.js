const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('./auth/authRouter.js');
const imagesRouter = require('./images/imagesRouter.js');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/auth', authRouter);
server.use('/images', imagesRouter);

module.exports = server;
