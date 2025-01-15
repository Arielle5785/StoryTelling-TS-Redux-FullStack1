const db = require('../db/db');

const Story = {
  create: async (title, content, authorId) => {
    const result = await db.query(
      'INSERT INTO Stories (title, content, author_id) VALUES ($1, $2, $3) RETURNING *',
      [title, content, authorId]
    );
    return result.rows[0];
  },
  findAll: async () => {
    const result = await db.query('SELECT * FROM Stories');
    return result.rows;
  },
};

module.exports = Story;
