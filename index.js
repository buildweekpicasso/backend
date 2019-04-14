const express = require('express');
require('dotenv').config();

// const server = require('./server.js');
const server = express();
server.use(express.json());

const PYTHON = 'python3.7';

server.get('/', (_req, res) => {
  res.json({
    message: 'Hello!!!'
  });
});

server.post('/', (req, res) => {
  console.log(JSON.stringify(req.body));

  const { spawn } = require('child_process');
  const process = spawn(PYTHON, ['./example.py', ...Object.values(req.body)]);

  process.stdout.on(
    'data',
    d => (console.log(d.toString()), res.json(d.toString()))
  );
});

const port = process.env.PORT || 5555;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
