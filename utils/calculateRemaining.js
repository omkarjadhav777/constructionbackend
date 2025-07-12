const DailyEntry = require('../models/DailyEntry');

const calculateRemaining = async (newEntry) => {
  const entryDate = new Date(newEntry.date);

  const previousEntry = await DailyEntry.findOne({ date: { $lt: entryDate } }).sort({ date: -1 });

  const prevBlock = previousEntry ? Number(previousEntry.remainingBlock || 0) : 0;
  const prevCement = previousEntry ? Number(previousEntry.remainingCement || 0) : 0;

  const blockAdded = Number(newEntry.blockAdded || 0);

  const blockSold = Array.isArray(newEntry.blockSold)
    ? newEntry.blockSold.reduce((sum, sale) => sum + Number(sale.quantity || 0), 0)
    : 0;

  const cementAdded = Number(newEntry.cementAdded || 0);
  const cementUsed = Number(newEntry.cementUsed || 0);

  const remainingBlock = prevBlock + blockAdded - blockSold;
  const remainingCement = prevCement + cementAdded - cementUsed;

  return { remainingBlock, remainingCement };
};

module.exports = calculateRemaining;
