const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, _decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'Invalid Credentials' });
      } else {
        req.isAuthorized = true;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No credentials provided' });
  }
};
