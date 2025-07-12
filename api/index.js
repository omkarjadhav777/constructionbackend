const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();

const entryRoutes = require('../routes/entryRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Test root route
app.get('/api', (req, res) => {
  res.send('✅ API is working');
});

// Main route
app.use('/api/entries', entryRoutes);

module.exports = app;
module.exports.handler = serverless(app); // ✅ required by Vercel
