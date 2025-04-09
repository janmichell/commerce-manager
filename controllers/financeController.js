const Finance = require("../models/Finance");

// Listar todos os registros financeiros
exports.getFinance = async (req, res) => {
  try {
    const records = await Finance.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Adicionar novo registro financeiro
exports.addFinance = async (req, res) => {
  try {
    const record = new Finance(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};