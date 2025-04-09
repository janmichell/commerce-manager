const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Finance', financeSchema);