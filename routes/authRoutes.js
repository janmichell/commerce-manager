const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);

// Rota temporária para gerar token de teste
router.post("/login", (req, res) => {
  const user = {
    id: "123456",
    name: "Jack",
    email: "jack@exemplo.com",
  };

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
});

//router.post("/login", authController.login);

module.exports = router;