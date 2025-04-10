// routes/protectedRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

// Exemplo de rota protegida
router.get("/dashboard", protect, (req, res) => {
  res.json({
    message: "Acesso autorizado ao dashboard!",
    user: req.user  // o middleware adiciona isso com os dados do token
  });
});

module.exports = router;