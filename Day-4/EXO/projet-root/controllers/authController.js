const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../models/userModel');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now().toString(), email, password: hashed, isAdmin: false };
  users.push(newUser);
  const { password: _, ...safeUser } = newUser;
  res.status(201).json(safeUser);
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    // ✅ VALIDATION ICI
    const { isValidEmail, isValidPassword } = require('../utils/validateInput');
    
    if (!isValidEmail(email) || !isValidPassword(password)) {
      return res.status(400).json({ message: 'Email ou mot de passe invalide' });
    }
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user.id, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  
  res.json({ token });
};
