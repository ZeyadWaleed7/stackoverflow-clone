const axios = require('axios');
const jwt = require('jsonwebtoken');

// Test configuration
const config = {
    userService: 'http://localhost:5001',
    authService: 'http://localhost:5000',
    qaService: 'http://localhost:5000',
    votingService: 'http://localhost:3001',
    searchService: 'http://localhost:5002',
    notificationService: 'http://localhost:4005',
    apiGateway: 'http://localhost:3000'
};

// Helper to create a test user
async function createTestUser() {
    const userData = {
        username: `testuser_${Date.now()}`,
        email: `test_${Date.now()}@example.com`,
        password: 'Test123!'
    };

    const response = await axios.post(`${config.userService}/api/users/register`, userData);
    return response.data;
}

// Helper to get auth token
async function getAuthToken(email, password) {
    const response = await axios.post(`${config.authService}/api/auth/login`, {
        email,
        password
    });
    return response.data.token;
}

// Helper to create a test question
async function createTestQuestion(authToken) {
    const questionData = {
        title: `Test Question ${Date.now()}`,
        body: 'This is a test question body',
        tags: ['test', 'javascript']
    };

    const response = await axios.post(`${config.qaService}/api/questions`, questionData, {
        headers: { Authorization: `Bearer ${authToken}` }
    });
    return response.data;
}

// Helper to create a test answer
async function createTestAnswer(questionId, authToken) {
    const answerData = {
        body: 'This is a test answer',
        questionId
    };

    const response = await axios.post(`${config.qaService}/api/answers`, answerData, {
        headers: { Authorization: `Bearer ${authToken}` }
    });
    return response.data;
}

// Helper to create a test vote
async function createTestVote(contentId, type, authToken) {
    const voteData = {
        type,
        contentId
    };

    const response = await axios.post(`${config.votingService}/api/votes`, voteData, {
        headers: { Authorization: `Bearer ${authToken}` }
    });
    return response.data;
}

// Helper to verify JWT token
function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}

// Helper to wait for async operations
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    config,
    createTestUser,
    getAuthToken,
    createTestQuestion,
    createTestAnswer,
    createTestVote,
    verifyToken,
    wait
}; 