const test = require('tape');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { generateToken, generateTokenPair, verifyToken, refreshAccessToken } = require('../services/jwtService');

// Mock environment variables
process.env.JWT_SECRET = 'test-secret';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
process.env.USER_SERVICE_URL = 'http://localhost:5001';
process.env.GOOGLE_CLIENT_ID = 'test-client-id';
process.env.GOOGLE_CLIENT_SECRET = 'test-client-secret';
process.env.CALLBACK_URL = 'http://localhost:5000/auth/google/callback';

// Mock axios
axios.post = (url, data) => Promise.resolve({ data: {} });

// Mock passport and GoogleStrategy
const mockPassport = {
    use: () => { },
    authenticate: () => { }
};

const mockGoogleStrategy = {
    _verify: () => { }
};

// JWT Service Tests
test('JWT Service - Token Operations', (t) => {
    const mockUser = {
        _id: '123',
        name: 'Test User'
    };

    // Test access token
    const token = generateToken(mockUser._id, mockUser.name);
    const decoded = verifyToken(token);

    t.deepEqual(
        { userId: decoded.userId, name: decoded.name, type: decoded.type },
        { userId: mockUser._id, name: mockUser.name, type: 'access' },
        'should generate and verify access token'
    );

    // Test refresh token
    const refreshToken = generateToken(mockUser._id, mockUser.name, true);
    const refreshDecoded = verifyToken(refreshToken, true);

    t.deepEqual(
        { userId: refreshDecoded.userId, name: refreshDecoded.name, type: refreshDecoded.type },
        { userId: mockUser._id, name: mockUser.name, type: 'refresh' },
        'should generate and verify refresh token'
    );

    // Test token pair
    const tokens = generateTokenPair(mockUser._id, mockUser.name);
    t.ok(tokens.accessToken, 'should have access token');
    t.ok(tokens.refreshToken, 'should have refresh token');

    const pairAccessDecoded = verifyToken(tokens.accessToken);
    const pairRefreshDecoded = verifyToken(tokens.refreshToken, true);

    t.equal(pairAccessDecoded.type, 'access', 'access token should have correct type');
    t.equal(pairRefreshDecoded.type, 'refresh', 'refresh token should have correct type');

    // Test token refresh
    const newTokens = refreshAccessToken(refreshToken);
    t.ok(newTokens.accessToken, 'should generate new access token');
    t.ok(newTokens.refreshToken, 'should generate new refresh token');

    // Test invalid tokens
    t.throws(() => verifyToken('invalid-token'), 'should throw on invalid token');
    t.throws(() => refreshAccessToken('invalid-token'), 'should throw on invalid refresh token');

    t.end();
});

// Google OAuth Tests
test('Google OAuth - Authentication', async (t) => {
    const mockGoogleProfile = {
        id: 'google123',
        displayName: 'Google User',
        emails: [{ value: 'google@example.com' }],
        photos: [{ value: 'https://example.com/photo.jpg' }],
        _json: { aboutMe: 'Test bio' }
    };

    const mockUserResponse = {
        data: {
            _id: '123',
            googleId: mockGoogleProfile.id,
            name: mockGoogleProfile.displayName,
            email: mockGoogleProfile.emails[0].value,
            image: mockGoogleProfile.photos[0].value,
            bio: mockGoogleProfile._json.aboutMe
        }
    };

    axios.post = () => Promise.resolve(mockUserResponse);

    const done = (error, result) => {
        t.error(error, 'should not have error');
        t.ok(result.token, 'should have token');
        t.ok(result.user, 'should have user');
        t.end();
    };

    await mockGoogleStrategy._verify(null, null, mockGoogleProfile, done);
});

// Rate Limiting Tests
test('Rate Limiting', (t) => {
    const { authLimiter, googleAuthLimiter } = require('../middlewares/rateLimiter');

    t.ok(authLimiter, 'should have auth limiter');
    t.ok(googleAuthLimiter, 'should have google auth limiter');
    t.end();
}); 