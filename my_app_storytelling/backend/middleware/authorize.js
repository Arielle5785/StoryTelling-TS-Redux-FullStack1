const Story = require('../models/storyModel');

const authorize = async (req, res, next) => {
  try {
    const { user } = req;
    const { storyId } = req.params;

    const story = await Story.findById(storyId);
    if (!story || story.author_id !== user.id) {
      return res.status(403).json({ message: 'You are not authorized to perform this action.' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Authorization check failed', error: error.message });
  }
};

module.exports = authorize;
