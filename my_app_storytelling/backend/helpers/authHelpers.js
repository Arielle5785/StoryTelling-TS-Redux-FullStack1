const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const saltRounds = 10
const hashPassword = await bcrypt.hash(userPassword, saltRounds)

if (!username || !email || !password) {
return res.status(400).json({ message: "All fields are required." })
}
// Save to database
await db.query(
"INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)",
[username, email, hashedPassword],
)

// const comparePassword = async (password, hash) => {
//   return await bcrypt.compare(password, hash);
// };
const isMatch = await bcrypt.compare(inputPassword, storedPasswordHash)
if (!isMatch) {
return res.status(401).json({ message: "Invalid credentials." })
}


// const generateToken = (user) => {
//   return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
// };
const jwt = require("jsonwebtoken")
const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
expiresIn: "15m",
})
const refreshToken = jwt.sign(
{ userId: user.id },
process.env.REFRESH_SECRET,
{ expiresIn: "7d" },
)
res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
res.json({ accessToken })

module.exports = { hashPassword, isMatch, accessToken, refreshToken };
