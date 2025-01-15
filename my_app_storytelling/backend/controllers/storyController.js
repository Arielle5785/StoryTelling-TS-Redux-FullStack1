const Story = require('../models/storyModel');

const createStory = async (req, res) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user.id;
    const story = await Story.create(title, content, authorId);
    res.status(201).json({ story });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create story' });
  }
};

const getStories = async (req, res) => {
  try {
    const stories = await Story.findAll();
    res.json({ stories });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
};

module.exports = { createStory, getStories };
