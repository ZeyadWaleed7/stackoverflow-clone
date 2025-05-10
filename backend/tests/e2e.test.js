const test = require('tape');
const axios = require('axios');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Test configuration with environment variables
const config = {
    userService: process.env.USER_SERVICE_URL || 'http://localhost:5001',
    authService: process.env.AUTH_SERVICE_URL || 'http://localhost:5000',
    qaService: process.env.QA_SERVICE_URL || 'http://localhost:5000',
    votingService: process.env.VOTING_SERVICE_URL || 'http://localhost:3001',
    searchService: process.env.SEARCH_SERVICE_URL || 'http://localhost:5002',
    notificationService: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:4005',
    apiGateway: process.env.API_GATEWAY_URL || 'http://localhost:3000',
    testUser: {
        username: process.env.TEST_USERNAME || 'testuser',
        email: process.env.TEST_EMAIL || 'test@example.com',
        password: process.env.TEST_PASSWORD || 'Test123!'
    }
};

// Retry configuration
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000; // 1 second

// Helper function for retrying failed requests
async function retryRequest(fn, attempts = RETRY_ATTEMPTS) {
    for (let i = 0; i < attempts; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === attempts - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        }
    }
}

let mongoServer;
let testUser;
let authToken;
let testQuestionId;

// Helper function to clean up test data
async function cleanupTestData() {
    try {
        if (testUser) {
            await axios.delete(`${config.userService}/api/users/${testUser._id}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
        }
        if (testQuestionId) {
            await axios.delete(`${config.qaService}/api/questions/${testQuestionId}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
        }
    } catch (error) {
        console.error('Cleanup error:', error.message);
    }
}

// Setup before all tests
test('Setup', async (t) => {
    try {
        // Start MongoDB memory server
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);

        // Create test user with retry
        const userResponse = await retryRequest(async () => {
            return await axios.post(`${config.userService}/api/users/register`, {
                username: config.testUser.username,
                email: config.testUser.email,
                password: config.testUser.password
            });
        });
        testUser = userResponse.data;

        // Get auth token with retry
        const authResponse = await retryRequest(async () => {
            return await axios.post(`${config.authService}/api/auth/login`, {
                email: config.testUser.email,
                password: config.testUser.password
            });
        });
        authToken = authResponse.data.token;

        t.pass('Setup completed successfully');
    } catch (error) {
        t.fail(`Setup failed: ${error.message}`);
    }
    t.end();
});

// Test API Gateway
test('API Gateway - Health Check', async (t) => {
    try {
        const response = await retryRequest(async () => {
            return await axios.get(`${config.apiGateway}/health`);
        });
        t.equal(response.status, 200, 'API Gateway should be healthy');
        t.ok(response.data, 'Should return health check data');
    } catch (error) {
        t.fail(`API Gateway health check failed: ${error.message}`);
    }
    t.end();
});

// Test User Service
test('User Service - Get User Profile', async (t) => {
    try {
        const response = await retryRequest(async () => {
            return await axios.get(`${config.userService}/api/users/${testUser._id}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
        });
        t.equal(response.status, 200, 'Should get user profile');
        t.equal(response.data.email, config.testUser.email, 'Should return correct user email');
        t.ok(response.data.username, 'Should include username');
        t.ok(response.data._id, 'Should include user ID');
    } catch (error) {
        t.fail(`User profile test failed: ${error.message}`);
    }
    t.end();
});

// Test User Service - Update Profile
test('User Service - Update Profile', async (t) => {
    try {
        const updateData = {
            username: 'updateduser',
            bio: 'Test bio'
        };
        const response = await retryRequest(async () => {
            return await axios.patch(`${config.userService}/api/users/${testUser._id}`, updateData, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
        });
        t.equal(response.status, 200, 'Should update profile successfully');
        t.equal(response.data.username, updateData.username, 'Should update username');
        t.equal(response.data.bio, updateData.bio, 'Should update bio');
    } catch (error) {
        t.fail(`Profile update test failed: ${error.message}`);
    }
    t.end();
});

// Test Q&A Service
test('Q&A Service - Create Question', async (t) => {
    try {
        const questionData = {
            title: 'Test Question',
            body: 'This is a test question',
            tags: ['test', 'javascript']
        };

        const response = await retryRequest(async () => {
            return await axios.post(`${config.qaService}/api/questions`, questionData, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
        });

        testQuestionId = response.data._id;
        t.equal(response.status, 201, 'Should create question successfully');
        t.equal(response.data.title, questionData.title, 'Should return correct question title');
        t.ok(response.data._id, 'Should return question ID');
        t.ok(Array.isArray(response.data.tags), 'Should include tags array');
    } catch (error) {
        t.fail(`Question creation test failed: ${error.message}`);
    }
    t.end();
});

// Test Q&A Service - Get Question
test('Q&A Service - Get Question', async (t) => {
    try {
        const response = await retryRequest(async () => {
            return await axios.get(`${config.qaService}/api/questions/${testQuestionId}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
        });

        t.equal(response.status, 200, 'Should get question successfully');
        t.equal(response.data._id, testQuestionId, 'Should return correct question');
        t.ok(response.data.author, 'Should include author information');
    } catch (error) {
        t.fail(`Question retrieval test failed: ${error.message}`);
    }
    t.end();
});

// Test Voting Service
test('Voting Service - Vote on Question', async (t) => {
    try {
        const voteData = {
            type: 'upvote',
            questionId: testQuestionId
        };

        const response = await retryRequest(async () => {
            return await axios.post(`${config.votingService}/api/votes`, voteData, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
        });

        t.equal(response.status, 200, 'Should process vote successfully');
        t.ok(response.data.voteCount, 'Should return updated vote count');
    } catch (error) {
        t.fail(`Voting test failed: ${error.message}`);
    }
    t.end();
});

// Test Search Service
test('Search Service - Search Questions', async (t) => {
    try {
        const response = await retryRequest(async () => {
            return await axios.get(`${config.searchService}/api/search?q=test`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
        });

        t.equal(response.status, 200, 'Should return search results');
        t.true(Array.isArray(response.data), 'Should return an array of results');
        t.ok(response.data.length >= 0, 'Should return valid results array');
    } catch (error) {
        t.fail(`Search test failed: ${error.message}`);
    }
    t.end();
});

// Test Notification Service
test('Notification Service - Get Notifications', async (t) => {
    try {
        const response = await retryRequest(async () => {
            return await axios.get(`${config.notificationService}/api/notifications`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
        });

        t.equal(response.status, 200, 'Should get notifications');
        t.true(Array.isArray(response.data), 'Should return an array of notifications');
    } catch (error) {
        t.fail(`Notification test failed: ${error.message}`);
    }
    t.end();
});

// Test Error Cases
test('Error Cases - Invalid Authentication', async (t) => {
    try {
        await axios.get(`${config.userService}/api/users/${testUser._id}`, {
            headers: { Authorization: 'Bearer invalid-token' }
        });
        t.fail('Should reject invalid token');
    } catch (error) {
        t.equal(error.response.status, 401, 'Should return 401 for invalid token');
    }
    t.end();
});

// Cleanup after all tests
test('Cleanup', async (t) => {
    try {
        await cleanupTestData();
        await mongoose.disconnect();
        await mongoServer.stop();
        t.pass('Cleanup completed successfully');
    } catch (error) {
        t.fail(`Cleanup failed: ${error.message}`);
    }
    t.end();
}); 