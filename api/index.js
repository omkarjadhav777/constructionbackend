const serverless = require('serverless-http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const entryRoutes = require('../routes/entryRoutes'); // Adjust path if needed

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

app.use('/api/entries', entryRoutes);

module.exports = app;
module.exports.handler = serverless(app);
