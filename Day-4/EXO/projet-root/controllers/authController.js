const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../models/User');
const { isValidEmail, isValidPassword } = require('../utils/validateInput');

exports.register = async (req, res) => {
  const { email, password } = req.body;

  // ✅ Validation des données
  if (!isValidEmail(email) || !isValidPassword(password)) {
    return res.status(400).json({ message: 'Email ou mot de passe invalide' });
  }

  // ✅ Vérification de l'unicité de l'email
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'Email déjà utilisé' });
  }

  // ✅ Hachage du mot de passe
  const hashed = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now().toString(),
    email,
    password: hashed,
    isAdmin: false
  };

  users.push(newUser);

  // ✅ Masquer le mot de passe dans la réponse
  const { password: _, ...safeUser } = newUser;
  res.status(201).json(safeUser);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ message: 'Identifiants invalides' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Identifiants invalides' });

  // ✅ Utilisation de JWT_SECRET depuis .env
  const token = jwt.sign(
    { id: user.id, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
};
