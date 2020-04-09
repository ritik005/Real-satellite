const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.json({message: 'Access denied. No Token provided'});

  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decodedPayload;
    next();
  }
  catch (ex) {
    res.json({ message: 'Invalid Token.'});
  }
}