const express = require('express');
const router = express.Router();
const DailyEntry = require('../models/DailyEntry');
const calculateRemaining = require('../utils/calculateRemaining');

// POST - Add new entry
router.post('/', async (req, res) => {
  try {
    const { remainingBlock, remainingCement } = await calculateRemaining(req.body);
    const entry = new DailyEntry({ ...req.body, remainingBlock, remainingCement });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    console.error('Error in POST /api/entries:', err);
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

// DELETE - Entry by Date (YYYY-MM-DD)
router.delete('/by-date/:date', async (req, res) => {
  try {
    const targetDate = new Date(req.params.date);
    const nextDay = new Date(targetDate);
    nextDay.setDate(targetDate.getDate() + 1);

    const result = await DailyEntry.deleteOne({
      date: { $gte: targetDate, $lt: nextDay }
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No entry found for that date' });
    }

    res.json({ message: `Entry deleted for date: ${req.params.date}` });
  } catch (err) {
    console.error('Error in DELETE /api/entries/by-date/:date:', err);
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

// GET - All Entries
router.get('/', async (req, res) => {
  try {
    const entries = await DailyEntry.find().sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    console.error('Error in GET /api/entries:', err);
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

// GET - Latest Entry (Remaining stock)
router.get('/latest', async (req, res) => {
  try {
    const latest = await DailyEntry.findOne().sort({ date: -1 });
    if (!latest) {
      return res.status(404).json({ message: "No entries yet" });
    }
    res.json({
      date: latest.date,
      remainingBlock: latest.remainingBlock || 0,
      remainingCement: latest.remainingCement || 0
    });
  } catch (err) {
    console.error('Error in GET /api/entries/latest:', err);
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

module.exports = router;
