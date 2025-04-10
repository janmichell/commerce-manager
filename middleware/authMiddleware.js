const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "minha_senha_secreta";

exports.protect = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token não fornecido" });
  }
  token = token.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Pode ser usado nas rotas protegidas
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido" });
  }
};