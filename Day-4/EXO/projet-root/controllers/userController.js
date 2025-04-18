const users = require('../models/userModel');

exports.getMe = (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ email: user.email });
};

exports.getAllUsers = (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Admin privileges required' });
  }
  res.json(users.map(({ password, ...rest }) => rest));
};

exports.deleteUser = (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'User not found' });
  users.splice(index, 1);
  res.json({ message: 'User deleted' });
};
