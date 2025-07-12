const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');

require('dotenv').config();

const entryRoutes = require('../routes/entries');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/entries', entryRoutes);

// Connect MongoDB (only if not already connected)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error", err));

app.get('/', (req, res) => {
  res.send('Backend running on Vercel 🚀');
});

module.exports = app;
module.exports.handler = serverless(app);
