const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/usersModel.js');
const AuthUtils = require('./authUtils.js');

// const restricted = require('../auth/restricted-middleware.js');

router.post('/register', (req, res) => {
  console.log('registering', req.body);
  let user = req.body;
  user.password = bcrypt.hashSync(user.password, 10);

  Users.add(user)
    .then(saved => {
      console.log('saved user', saved);
      const token = AuthUtils.generateUserToken(saved);
      res.status(201).json({ token });
    })
    .catch(error => {
      console.log('error adding user', error);
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = AuthUtils.generateUserToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;