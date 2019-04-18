const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Invalid Credentials' });
      } else {
        console.log('\n\n\n***** DECODED:', JSON.stringify(decoded, null, 2));
        req.username = decoded.username;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No credentials provided' });
  }
};
