const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    // Para segurança, apenas o admin deve poder criar perfis diferentes de vendedor.
    // Se não for admin e passar role, força para default, por exemplo.
    const userData = { username, password };
    if (role) userData.role = role;

    const user = new User(userData);
    await user.save();
    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "Usuário não encontrado." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Senha inválida." });

    // Aqui incluímos o role no payload do token
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};