const test = require('tape');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/userModel');
const {
    createUser,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController');
const { authenticateJWT } = require('../middlewares/authMiddleware');

// Mock environment variables
process.env.JWT_SECRET = 'test-secret';

// Mock request and response objects
const mockRequest = (body = {}, params = {}, user = null) => ({
    body,
    params,
    user,
    header: () => 'Bearer test-token'
});

const mockResponse = () => {
    const res = {
        status: function (code) {
            this.statusCode = code;
            return this;
        },
        json: function (data) {
            this.data = data;
            return this;
        }
    };
    return res;
};

let mongoServer;

// Setup and teardown
test('setup', async (t) => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    t.end();
});

test('cleanup', async (t) => {
    await User.deleteMany({});
    t.end();
});

test('teardown', async (t) => {
    await mongoose.disconnect();
    await mongoServer.stop();
    t.end();
});

// User Operations Tests
test('User Operations - Create and Retrieve', async (t) => {
    const mockUser = {
        name: 'Test User',
        email: 'test@example.com',
        googleId: 'google123'
    };

    // Create user
    const createReq = mockRequest(mockUser);
    const createRes = mockResponse();
    await createUser(createReq, createRes);

    t.equal(createRes.statusCode, 201, 'should return 201 status code');
    const createdUser = createRes.data;

    // Get user
    const getReq = mockRequest({}, { id: createdUser._id });
    const getRes = mockResponse();
    await getUserById(getReq, getRes);

    t.equal(getRes.statusCode, 200, 'should return 200 status code');
    t.equal(getRes.data.email, mockUser.email, 'should return correct user email');
    t.end();
});

test('User Operations - Update', async (t) => {
    const mockUser = {
        name: 'Test User',
        email: 'test@example.com',
        googleId: 'google123'
    };

    // Create user first
    const user = await User.create(mockUser);

    // Update user
    const updates = { name: 'Updated Name' };
    const req = mockRequest(updates, { id: user._id });
    const res = mockResponse();

    await updateUser(req, res);

    t.equal(res.statusCode, 200, 'should return 200 status code');
    t.equal(res.data.name, updates.name, 'should update user name');
    t.end();
});

test('User Operations - Delete', async (t) => {
    const mockUser = {
        name: 'Test User',
        email: 'test@example.com',
        googleId: 'google123'
    };

    // Create user first
    const user = await User.create(mockUser);

    // Delete user
    const req = mockRequest({}, { id: user._id });
    const res = mockResponse();

    await deleteUser(req, res);

    t.equal(res.statusCode, 200, 'should return 200 status code');
    const deletedUser = await User.findById(user._id);
    t.equal(deletedUser, null, 'should delete user from database');
    t.end();
});

// Auth Middleware Tests
test('Auth Middleware - Valid Token', (t) => {
    const token = jwt.sign(
        { userId: '123', name: 'Test User', type: 'access' },
        process.env.JWT_SECRET
    );

    const req = mockRequest();
    req.header = () => `Bearer ${token}`;
    const res = mockResponse();
    const next = () => { };

    authenticateJWT(req, res, next);

    t.ok(req.user, 'should set user in request');
    t.end();
});

test('Auth Middleware - Invalid Token', (t) => {
    const req = mockRequest();
    req.header = () => 'Bearer invalid-token';
    const res = mockResponse();
    const next = () => { };

    authenticateJWT(req, res, next);

    t.equal(res.statusCode, 401, 'should return 401 status code');
    t.end();
}); 