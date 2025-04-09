const Sale = require("../models/Sale");
const Product = require("../models/Product");

exports.createSale = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Buscar o produto para verificar estoque e obter o preço
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }
    if (product.quantity < quantity) {
      return res.status(400).json({ error: "Quantidade insuficiente no estoque." });
    }

    // Atualizar o estoque (subtrair a quantidade vendida)
    product.quantity -= quantity;
    await product.save();

    // Calcular o valor total da venda (podendo ser aprimorado com descontos, etc.)
    const totalPrice = product.price * quantity;

    // Criar o registro de venda
    const sale = new Sale({
      product: productId,
      quantity: quantity,
      salePrice: totalPrice
    });
    await sale.save();

    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSales = async (req, res) => {
  try {
    // Popula os dados do produto para facilitar a visualização
    const sales = await Sale.find().populate("product");
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};