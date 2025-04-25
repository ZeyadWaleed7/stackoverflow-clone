const jwt = require('jsonwebtoken');

const generateJWT = (user) => {
  const payload = { 
    userId: user._id,
    name: user.name || user.username  // Try to use name, fall back to username if name doesn't exist
  };
  const secretKey = global.JWT_SECRET;
  const options = { expiresIn: '1h' };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

module.exports = { generateJWT };
