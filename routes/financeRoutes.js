const express = require("express");
const router = express.Router();
const financeController = require("../controllers/financeController");
const { protect } = require("../middleware/authMiddleware");

// Rota para listar registros financeiros
router.get("/", financeController.getFinance);

// Rota para adicionar um novo registro financeiro
router.post("/", financeController.addFinance);

// Rotas protegidas
router.get("/exemplo")

module.exports = router;