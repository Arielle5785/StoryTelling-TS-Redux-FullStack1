const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const storyRoutes = require('./routes/storyRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/stories', storyRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
