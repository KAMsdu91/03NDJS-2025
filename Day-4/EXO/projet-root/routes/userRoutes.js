const express = require('express');
const { getMe, getAllUsers, deleteUser } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', auth, getMe);
router.get('/users', auth, getAllUsers);
router.delete('/users/:id', auth, deleteUser);

module.exports = router;
