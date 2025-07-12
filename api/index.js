const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const entryRoutes = require('../routes/entryRoutes'); // Make sure this is correct!

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/entries', entryRoutes);

// ✅ NO app.listen() allowed!

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

app.get('/api', (req, res) => {
  res.json({ message: "✅ API is working" });
});

module.exports.handler = serverless(app);
