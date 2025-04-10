// Outros imports...
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Importação das rotas
const productRoutes = require("./routes/productRoutes");
const financeRoutes = require("./routes/financeRoutes");
const saleRoutes = require("./routes/saleRoutes");
const authRoutes = require("./routes/authRoutes");

// Importação dos middlewares de autenticação e autorização
const { protect } = require("./middleware/authMiddleware");
const restrictTo = require("./middleware/restrictTo");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Rotas públicas
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", saleRoutes);

// Rotas protegidas para financeiro: só admin e gerente têm acesso
app.use("/api/finance", protect, restrictTo("admin", "gerente"), financeRoutes);

// Rota raiz para teste
app.get("/", (req, res) => {
  res.send("API do Commerce Manager funcionando! MongoDB está conectado.");
});

// Conexão ao MongoDB e inicialização do server
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Conectado"))
  .catch((err) => console.error("Erro ao conectar MongoDB:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));