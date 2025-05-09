const redis = require('redis');
const mongoose = require('mongoose');
const Question = require('./models/Question');
const Answer = require('./models/Answer.model');

const redisClient = redis.createClient({ 
  url: 'redis://localhost:6379',
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        console.error('Redis max retries reached. Exiting.');
        process.exit(1);
      }
      return Math.min(retries * 100, 3000);
    }
  }
});

const retryClient = redis.createClient({ 
  url: 'redis://localhost:6379',
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        console.error('Redis retry client max retries reached.');
        return Math.min(retries * 100, 3000);
      }
      return Math.min(retries * 100, 3000);
    }
  }
});

const RETRY_QUEUE = 'voteRetryQueue';
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;

mongoose.connect('mongodb://localhost:27017/voteapp')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

redisClient.on('connect', () => {
  console.log('Worker connected to Redis');
});

retryClient.on('connect', () => {
  console.log('Retry client connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis error', err);
});

retryClient.on('error', (err) => {
  console.error('Retry Redis error', err);
});

async function connectRedis() {
  try {
    await redisClient.connect();
    await retryClient.connect();
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
    process.exit(1);
  }
}

async function saveVote(vote) {
  const { targetId, type, voteType } = vote;
  let itemToUpdate;
  
  if (type === 'question') {
    itemToUpdate = await Question.findById(targetId);
  } else if (type === 'answer') {
    itemToUpdate = await Answer.findById(targetId);
  } else {
    throw new Error(`Unknown vote type: ${type}`);
  }
  
  if (!itemToUpdate) {
    throw new Error(`${type} with ID ${targetId} not found for vote processing`);
  }
  
  if (voteType === 'upvote') {
    itemToUpdate.upvotes = (itemToUpdate.upvotes || 0) + 1;
  } else if (voteType === 'downvote') {
    itemToUpdate.downvotes = (itemToUpdate.downvotes || 0) + 1;
  }
  
  await itemToUpdate.save();
  return true;
}

async function processVoteQueue() {
  console.log('Worker is listening for votes...');
  
  while (true) {
    try {
      if (!redisClient.isOpen) {
        console.log('Redis connection lost, attempting to reconnect...');
        await connectRedis();
      }

      const voteData = await redisClient.lPop('voteQueue');
      
      if (voteData) {
        const vote = JSON.parse(voteData);
        console.log('Processing vote:', vote);
        
        try {
          await saveVote(vote);
          console.log('Vote processed and saved:', vote);
        } catch (err) {
          console.error(`Error processing vote, adding to retry queue:`, err);
          
          vote.retryCount = vote.retryCount ? vote.retryCount + 1 : 1;
          vote.nextRetry = Date.now() + RETRY_DELAY_MS;
          
          if (vote.retryCount <= MAX_RETRIES) {
            await retryClient.rPush(RETRY_QUEUE, JSON.stringify(vote));
            console.log(`Vote added to retry queue, attempt ${vote.retryCount}/${MAX_RETRIES}`);
          } else {
            console.error(`Vote failed after ${MAX_RETRIES} attempts, logging for manual review:`, vote);
            await retryClient.rPush('voteFailedQueue', JSON.stringify(vote));
          }
        }
      } else {
        await processRetryQueue();
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (err) {
      console.error('Error in vote queue processing:', err);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
}

async function processRetryQueue() {
  try {
    const retryVotes = await retryClient.lRange(RETRY_QUEUE, 0, -1);
    if (retryVotes.length === 0) return;
    console.log(`Found ${retryVotes.length} votes in retry queue`);
    
    for (let i = 0; i < retryVotes.length; i++) {
      const voteData = retryVotes[i];
      const vote = JSON.parse(voteData);
      
      if (vote.nextRetry > Date.now()) continue;
      
      console.log(`Retrying vote, attempt ${vote.retryCount}/${MAX_RETRIES}:`, vote);
      
      await retryClient.lRem(RETRY_QUEUE, 1, voteData);
      
      try {
        await saveVote(vote);
        console.log('Retry successful, vote saved:', vote);
      } catch (err) {
        console.error(`Retry failed for vote:`, err);
        
        vote.retryCount += 1;
        vote.nextRetry = Date.now() + RETRY_DELAY_MS * vote.retryCount; 
        
        if (vote.retryCount <= MAX_RETRIES) {
          await retryClient.rPush(RETRY_QUEUE, JSON.stringify(vote));
          console.log(`Vote returned to retry queue, next attempt: ${vote.retryCount}/${MAX_RETRIES}`);
        } else {
          console.error(`Vote failed after ${MAX_RETRIES} retries, logging for manual review:`, vote);
          await retryClient.rPush('voteFailedQueue', JSON.stringify(vote));
        }
      }
    }
  } catch (err) {
    console.error('Error processing retry queue:', err);
  }
}

connectRedis().then(() => {
  processVoteQueue();
}).catch(err => {
  console.error('Failed to start vote worker:', err);
  process.exit(1);
});
