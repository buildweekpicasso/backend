const jwt = require('jsonwebtoken');

module.exports = {
  generateUserToken
};

function generateUserToken(user) {

  const payload = {
    subject: user.id,
    username: user.username,
  };
  const secret = process.env.SECRET;
  const options = {
    expiresIn: '20m',
  };

  return jwt.sign(payload, secret, options);
}