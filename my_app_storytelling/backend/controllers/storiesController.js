const StoryModel = require("../models/storiesModel");

const StoryController = {
  getAllStories: async (req, res) => {
    try {
      const stories = await StoryModel.getAllStories();
      res.json(stories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch stories" });
    }
  },

  createStory: async (req, res) => {
    const { title, content } = req.body;
    const authorId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    try {
      const story = await StoryModel.createStory(title, content, authorId);
      res.status(201).json(story);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create story" });
    }
  },

  updateStory: async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const authorId = req.user.id;

    try {
      const story = await StoryModel.updateStory(id, title, content, authorId);
      if (!story) {
        return res.status(404).json({ message: "Story not found or unauthorized" });
      }
      res.json(story);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update story" });
    }
  },

  deleteStory: async (req, res) => {
    const { id } = req.params;
    const authorId = req.user.id;

    try {
      const story = await StoryModel.deleteStory(id, authorId);
      if (!story) {
        return res.status(404).json({ message: "Story not found or unauthorized" });
      }
      res.json({ message: "Story deleted successfully", story });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete story" });
    }
  },

  getStoryById: async (req, res) => {
    const { id } = req.params;

    try {
      const story = await StoryModel.getStoryById(id);
      if (!story) {
        return res.status(404).json({ message: "Story not found" });
      }
      res.json(story);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch story" });
    }
  },
};

module.exports = StoryController;
