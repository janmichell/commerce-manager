const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const financeRoutes = require("./routes/financeRoutes");
app.use("/api/finance", financeRoutes);

const saleRoutes = require("./routes/saleRoutes");
app.use("/api/sale", saleRoutes);

app.get("/", (req, res) => {
  res.send("API do Commerce Manager funcionando! MongoDB está conectado.");
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Conectado"))
  .catch((err) => console.error("Erro ao conectar MongoDB:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
