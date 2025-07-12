const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const entryRoutes = require('../routes/entryRoutes'); // Update if needed

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/entries', entryRoutes); // Example route

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Test route
app.get('/api', (req, res) => {
  res.json({ message: '🚀 Vercel backend running successfully!' });
});

module.exports.handler = serverless(app);
