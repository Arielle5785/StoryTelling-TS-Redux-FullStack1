const db = require("../db/db");

const StoryModel = {
  getAllStories: async () => {
    const result = await db.query(`
      SELECT s.id, s.title, s.content, s.author_id, u.username AS author, s.created_at, s.updated_at
      FROM stories s
      JOIN users u ON s.author_id = u.id
    `);
    return result.rows;
  },

  createStory: async (title, content, authorId) => {
    const result = await db.query(
      `INSERT INTO stories (title, content, author_id) 
       VALUES ($1, $2, $3) RETURNING id, title, content, author_id, created_at, updated_at`,
      [title, content, authorId]
    );
    return result.rows[0];
  },

  updateStory: async (id, title, content, authorId) => {
    const result = await db.query(
      `UPDATE stories 
       SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $3 AND author_id = $4 
       RETURNING id, title, content, author_id, created_at, updated_at`,
      [title, content, id, authorId]
    );
    return result.rows[0];
  },

  deleteStory: async (id, authorId) => {
    const result = await db.query(
      `DELETE FROM stories 
       WHERE id = $1 AND author_id = $2 
       RETURNING id, title`,
      [id, authorId]
    );
    return result.rows[0];
  },

  getStoryById: async (id) => {
    const result = await db.query(
      `SELECT s.id, s.title, s.content, s.author_id, u.username AS author, s.created_at, s.updated_at
       FROM stories s
       JOIN users u ON s.author_id = u.id
       WHERE s.id = $1`,
      [id]
    );
    return result.rows[0];
  },
};

module.exports = StoryModel;
