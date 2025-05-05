const express = require('express');
const router = express.Router();
const { connectClient } = require("../redisClient");


const addToVoteQueue = async (voteData) => {
  try {
    const client = await connectClient();
    await client.rPush("voteQueue", JSON.stringify(voteData));
    console.log('Vote added to queue:', voteData);
    return true;
  } catch (err) {
    console.error('Error adding vote to queue:', err);
    return false;
  }
};


router.post('/', async (req, res) => {
  console.log('Received vote request:', req.body);
  
  try {
    const { userId, targetId, type, voteType } = req.body;
    
    
    if (!userId) console.log('Missing userId');
    if (!targetId) console.log('Missing targetId');
    if (!type) console.log('Missing type');
    if (!voteType) console.log('Missing voteType');
    
    if (!userId || !targetId || !type || !voteType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const vote = { 
      userId, 
      targetId, 
      type, 
      voteType,
      timestamp: Date.now()
    };
    
    console.log('Attempting to add vote to queue:', vote);
    const success = await addToVoteQueue(vote);
    
    if (success) {
      res.status(202).json({ message: 'Vote added to queue' });
    } else {
      res.status(500).json({ message: 'Failed to add vote to queue' });
    }
  } catch (err) {
    console.error('Error processing vote:', err);
    res.status(500).json({ message: 'Error processing vote', error: err.message });
  }
});


router.put("/:id/question/vote", async (req, res) => {
  try {
    const { userId, voteType } = req.body;
    const targetId = req.params.id;
    
    if (!userId || !voteType) {
      return res.status(400).json({ message: 'Missing userId or voteType' });
    }
    
    const vote = {
      targetId,
      type: 'question', 
      voteType,
      userId,
      timestamp: Date.now()
    };
    
    const success = await addToVoteQueue(vote);
    
    if (success) {
      res.status(202).json({ message: "Vote queued for processing." });
    } else {
      res.status(500).json({ error: "Failed to queue vote." });
    }
  } catch (err) {
    console.error('Error in /:id/question/vote:', err);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.put("/:id/answer/vote", async (req, res) => {
  try {
    const { userId, voteType } = req.body;
    const targetId = req.params.id;
    
    if (!userId || !voteType) {
      return res.status(400).json({ message: 'Missing userId or voteType' });
    }
    
    const vote = {
      targetId,
      type: 'answer',
      voteType,
      userId,
      timestamp: Date.now()
    };
    
    const success = await addToVoteQueue(vote);
    
    if (success) {
      res.status(202).json({ message: "Vote queued for processing." });
    } else {
      res.status(500).json({ error: "Failed to queue vote." });
    }
  } catch (err) {
    console.error('Error in /:id/answer/vote:', err);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
