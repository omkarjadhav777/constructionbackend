const mongoose = require('mongoose');

const dailyEntrySchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  blockAdded: Number,
  blockSold: [
    {
      name: String,
      quantity: Number
    }
  ],
  truckTrips: Number,
  cementUsed: Number,
  cementAdded: Number,
  remainingBlock: Number,
  remainingCement: Number
});

module.exports = mongoose.model('DailyEntry', dailyEntrySchema);
