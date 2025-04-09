const mongoose = require("mongoose");

const financeSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["entrada", "saida"], required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Finance", financeSchema);
