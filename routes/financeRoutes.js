const express = require("express");
const router = express.Router();
const financeController = require("../controllers/financeController");

// Rota para listar registros financeiros
router.get("/", financeController.getFinance);

// Rota para adicionar um novo registro financeiro
router.post("/", financeController.addFinance);

module.exports = router;