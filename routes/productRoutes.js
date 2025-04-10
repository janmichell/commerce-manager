const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Criar novo produto
router.post("/", async (req, res) => {
  const {
    externalId,
    name,
    description,
    baseCost,
    tax,
    supplierLink,
    listingText,
    price,
    quantity,
    imageUrl
  } = req.body;

  try {
    // Verificar duplicidade por externalId
    const existingProduct = await Product.findOne({ externalId });
    if (existingProduct) {
      return res.status(400).json({ error: "Produto com esse identificador externo já existe." });
    }

    const newProduct = new Product({
      externalId,
      name,
      description,
      baseCost,
      tax,
      supplierLink,
      listingText,
      price,
      quantity,
      imageUrl
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: "Erro ao adicionar produto: " + err.message });
  }
});

module.exports = router;