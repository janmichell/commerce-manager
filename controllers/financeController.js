const Finance = require('../models/Finance');

const getFinance = async (req, res) => {
  const records = await Finance.find();
  res.json(records);
};

const addFinance = async (req, res) => {
  const record = new Finance(req.body);
  await record.save();
  res.json(record);
};

module.exports = { getFinance, addFinance };