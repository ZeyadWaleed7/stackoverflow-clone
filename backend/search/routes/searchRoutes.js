const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.post('/index', searchController.indexQuestions);
router.get('/search', searchController.searchQuestions);

module.exports = router;