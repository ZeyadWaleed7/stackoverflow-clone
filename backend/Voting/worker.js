const { createClient } = require('redis');
const mongoose = require('mongoose');
const Question = require('./models/Question');
const Answer = require('./models/Answer.model');

const redisClient = createClient({ 
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

redisClient.on('error', (err) => {
  console.error('Redis error', err);
});

redisClient.on('reconnecting', () => {
  console.log('Reconnecting to Redis...');
});

async function connectRedis() {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
    process.exit(1);
  }
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
        
        const { userId, targetId, type, voteType } = vote;
        
        let itemToUpdate;
        
        if (type === 'question') {
          itemToUpdate = await Question.findById(targetId);
        } else if (type === 'answer') {
          itemToUpdate = await Answer.findById(targetId);
        } else {
          console.log('Unknown vote type:', type);
          continue;
        }
        
        if (itemToUpdate) {
          if (voteType === 'upvote') {
            itemToUpdate.upvotes = (itemToUpdate.upvotes || 0) + 1;
          } else if (voteType === 'downvote') {
            itemToUpdate.downvotes = (itemToUpdate.downvotes || 0) + 1;
          }
          
          await itemToUpdate.save();
          console.log('Vote processed and saved:', vote);
        } else {
          console.log(`${type} with ID ${targetId} not found for vote processing`);
        }
      } else {
        
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (err) {
      console.error('Error processing vote queue:', err);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
}


connectRedis().then(() => {
  processVoteQueue();
}).catch(err => {
  console.error('Failed to start vote worker:', err);
  process.exit(1);
});
