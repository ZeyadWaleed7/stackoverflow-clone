const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verify token type
    if (decoded.type !== 'access') {
      return res.status(401).json({ error: 'Invalid token type. Access token required.' });
    }

    req.user = {
      userId: decoded.userId,
      name: decoded.name
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired. Please refresh your token.' });
    }
    res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = { authenticateJWT };
