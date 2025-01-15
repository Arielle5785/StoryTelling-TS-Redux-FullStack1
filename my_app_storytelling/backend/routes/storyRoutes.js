const express = require('express');
const { createStory, getStories } = require('../controllers/storyController');

const router = express.Router();

router.post('/', createStory);
router.get('/', getStories);

module.exports = router;
