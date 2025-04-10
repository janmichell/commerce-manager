const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  externalId: {
    type: String,
    required: true,
    unique: true, // garante que não haja duplicatas
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  baseCost: Number,
  tax: Number, // valor numérico fixo
  supplierLink: String,
  listingText: String, // texto para marketplace
  price: Number,
  quantity: {
    type: Number,
    default: 1,
  },
  imageUrl: String, // link para a imagem do produto
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);