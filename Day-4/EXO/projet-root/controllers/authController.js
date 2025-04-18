const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { isValidEmail, isValidPassword } = require('../utils/validateInput');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validation des données
    if (!isValidEmail(email) || !isValidPassword(password)) {
      return res.status(400).json({ message: 'Email ou mot de passe invalide' });
    }

    // ✅ Vérifie si l'utilisateur existe déjà (avec await)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // ✅ Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Création de l'utilisateur
    const newUser = new User({
      email,
      password: hashedPassword
    });

    await newUser.save();

    const { password: _, ...safeUser } = newUser.toObject();
    res.status(201).json(safeUser);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Recherche de l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    // ✅ Vérifie le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    // ✅ Génère le token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
