const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const userRoutes = require('./backend/routes/userRoutes');
const storyRoutes = require('./backend/routes/storyRoutes');

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/stories', storyRoutes);

// Serve React build files
const REACT_APP_BASE_URL = path.join(__dirname, '/client/build');
app.use(express.static(REACT_APP_BASE_URL));

// Catch-all handler to serve React app for unhandled GET requests
app.get('*', (req, res) => {
  res.sendFile(path.resolve(REACT_APP_BASE_URL, 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
