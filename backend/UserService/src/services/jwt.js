const jwt = require('jsonwebtoken');

const generateJWT = (user) => {
  const payload = { userId: user._id };
  const secretKey = global.JWT_SECRET;
  const options = { expiresIn: '1h' };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

module.exports = { generateJWT };
