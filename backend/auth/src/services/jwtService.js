const jwt = require('jsonwebtoken');

const generateToken = (userId, name, isRefreshToken = false) => {
  const secret = isRefreshToken ? process.env.JWT_REFRESH_SECRET : process.env.JWT_SECRET;
  const expiresIn = isRefreshToken ? '7d' : '1h'; // Refresh token 7 days, access token 1 hour

  return jwt.sign(
    {
      userId,
      name,
      type: isRefreshToken ? 'refresh' : 'access'
    },
    secret,
    { expiresIn }
  );
};

const generateTokenPair = (userId, name) => {
  const accessToken = generateToken(userId, name, false);
  const refreshToken = generateToken(userId, name, true);

  return {
    accessToken,
    refreshToken
  };
};

const verifyToken = (token, isRefreshToken = false) => {
  const secret = isRefreshToken ? process.env.JWT_REFRESH_SECRET : process.env.JWT_SECRET;
  return jwt.verify(token, secret);
};

const refreshAccessToken = (refreshToken) => {
  try {
    const decoded = verifyToken(refreshToken, true);
    if (decoded.type !== 'refresh') {
      throw new Error('Invalid token type');
    }

    return generateTokenPair(decoded.userId, decoded.name);
  } catch (error) {
    if (error.message === 'Invalid token type') {
      throw error;
    }
    throw new Error('Invalid refresh token');
  }
};

module.exports = {
  generateToken,
  generateTokenPair,
  verifyToken,
  refreshAccessToken
};
