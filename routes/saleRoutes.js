const express = require("express");
const router = express.Router();
const saleController = require("../controllers/saleController");

// Rota para criar uma nova venda
router.post("/", saleController.createSale);

// Rota para listar todas as vendas
router.get("/", saleController.getSales);

module.exports = router;