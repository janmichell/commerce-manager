const Product = require('../models/Product');

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const addProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
};

module.exports = { getProducts, addProduct };