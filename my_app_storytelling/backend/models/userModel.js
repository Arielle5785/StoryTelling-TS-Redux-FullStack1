const db = require('../db/db');
const bcrypt = require("bcrypt");

module.exports = {
  createUser: async (username, password, email) => {
    const trx = await db.transaction();
    try {
      /** hash password bcrypt / argon2 */
      const hashPassword = await bcrypt.hash(password + "", 10);

      const [user] = await trx("users").insert(
        {
          username,
          email: email.toLowerCase(),
          password: hashPassword,
        },
        ["id","username","email" ]
      );

      await trx.commit();

      return user;
    } catch (error) {
      await trx.rollback();
      console.log(error);
      throw error;
    }
  },
  getUserByEmail: async (email) => {
    try {
      const user = await db("users")
        .select("id", "username", "email", "password")
        .where({ email: email.toLowerCase() })
        .first();
      return user;
    } catch (error) {
      throw error;
    }
  },
  getUsers: async () => {
    try {
      const users = await db("users").select("id","username", "email");
      return users;
    } catch (error) {
      throw error;
    }
  },
};


