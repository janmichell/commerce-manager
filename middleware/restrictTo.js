// middleware/restrictTo.js
module.exports = function restrictTo(...roles) {
  return (req, res, next) => {
    // O middleware "protect" deve ser usado antes para preencher req.user
    if (!req.user) {
      return res.status(401).json({ error: "Usuário não autenticado!" });
    }
    // Se a role do usuário não está na lista de roles permitidas
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Acesso negado: você não tem permissão para essa ação." });
    }
    next();
  };
};