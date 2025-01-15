const db = require('../db/db');

const User = {
  create: async (username, email, passwordHash) => {
    const result = await db.query(
      'INSERT INTO Users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
      [username, email, passwordHash]
    );
    return result.rows[0];
  },
  findByEmail: async (email) => {
    const result = await db.query('SELECT * FROM Users WHERE email = $1', [email]);
    return result.rows[0];
  },
};

module.exports = User;
