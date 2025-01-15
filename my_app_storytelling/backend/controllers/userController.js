const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const saltRounds = 10;

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Input validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save to the database
    const user = await User.create(username, email, hashedPassword);

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user", error });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Find the user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT tokens
    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_SECRET, {
      expiresIn: "7d",
    });

    // Send refresh token as an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });

    // Send access token in the response
    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: "Failed to log in", error });
  }
};


module.exports = { register, login };
