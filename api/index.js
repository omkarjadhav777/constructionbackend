const serverless = require('serverless-http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const entryRoutes = require('../routes/entryRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Default route for testing
app.get('/api', (req, res) => {
  res.send('✅ API is working');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
app.use('/api/entries', entryRoutes);

// Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);
