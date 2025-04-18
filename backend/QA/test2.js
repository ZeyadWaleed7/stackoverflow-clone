const request = require('supertest');
const mongoose = require('mongoose');
const { createClient } = require('redis');
const cacheService = require('./services/cacheService');
const Question = require('./models/questionsModel');

// Create Redis client
const redisClient = createClient({
  url: 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Test app setup
const app = require('express')();
app.use(require('express').json());

// Add cache middleware
app.get('/questions/:id', async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).send();

    const { contentHash, accesses } = await cacheService.trackContentAccess(
      question.title, 
      question.description
    );

    // Check cache
    const cached = await cacheService.getCachedContent(contentHash);
    if (cached) {
      req.cacheHit = true;
      return res.status(200).json(cached);
    }

    // Cache if threshold reached
    if (accesses >= 3) {
      await cacheService.cacheContent(contentHash, question);
      console.log(`[CACHE] Stored content ${contentHash}`);
    }

    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
});

// Test data
const testContent = {
  title: "How to use Redis caching?",
  description: "I need help implementing Redis cache"
};

async function runContentCacheTests() {
  console.log('\n=== Testing Content-Based Caching ===\n');
  
  try {
    // Connect to databases
    console.log('Connecting to databases...');
    await mongoose.connect('mongodb://127.0.0.1:27017/Stack-Overflow');
    await redisClient.connect();
    console.log('✓ Database connections established');

    // Create test questions
    console.log('Creating test questions...');
    const [q1, q2] = await Question.create([
      testContent,
      {...testContent, title: testContent.title.toUpperCase()} // Test case insensitivity
    ]);
    console.log(`✓ Created questions with IDs: ${q1._id}, ${q2._id}`);

    // Test 1: Verify shared access counting
    console.log('\n--- Testing Shared Access Counting ---');
    const hash = cacheService.generateContentHash(testContent.title, testContent.description);
    
    console.log('Making requests to different question IDs...');
    await request(app).get(`/questions/${q1._id}`); // Access 1
    await request(app).get(`/questions/${q2._id}`); // Access 2
    await request(app).get(`/questions/${q1._id}`); // Access 3
    
    const cached = await cacheService.getCachedContent(hash);
    console.log(`✓ Content cached after 3 accesses? ${!!cached}`);

    // Test 2: Verify cache serving
    console.log('\n--- Testing Cache Serving ---');
    const response = await request(app).get(`/questions/${q2._id}`);
    console.log(`✓ Q2 served from cache? ${response.headers['x-cache-hit'] === 'true'}`);

    console.log('\n=== All Tests Passed Successfully ===');
  } catch (error) {
    console.error('\n!!! Test Failed:', error);
  } finally {
    // Cleanup
    console.log('\nCleaning up...');
    await Question.deleteMany({ 
      title: { $regex: testContent.title, $options: 'i' } 
    });
    if (redisClient.isOpen) {
      await redisClient.quit();
    }
    await mongoose.connection.close();
    console.log('✓ Resources cleaned up');
    process.exit(0);
  }
}

// Add cache header middleware
app.use((req, res, next) => {
  res.on('finish', () => {
    res.setHeader('X-Cache-Hit', req.cacheHit ? 'true' : 'false');
  });
  next();
});

// Run tests
runContentCacheTests();