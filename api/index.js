const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const entryRoutes = require('./routes/entryRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection failed:', err));

app.use('/api/entries', entryRoutes);

module.exports = app; // required for serverless
