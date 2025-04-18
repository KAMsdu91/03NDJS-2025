const express = require('express');
const { getMe, getAllUsers, deleteUser } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', auth, getMe);        // /api/users/me
router.get('/', auth, getAllUsers);    // /api/users
router.delete('/:id', auth, deleteUser); // /api/users/:id

module.exports = router;
