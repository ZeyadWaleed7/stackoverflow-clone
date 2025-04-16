const express = require('express');
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { googleAuth } = require('../controllers/authController');
const { authenticateJWT } = require('../middlewares/authMiddleware');

router.post('/auth/google', googleAuth);

router.get('/profile', authenticateJWT, getUserById);

router.post('/', createUser);
router.get('/',getAllUsers);
router.get('/:id', authenticateJWT, getUserById); // Protect this route
router.put('/:id', authenticateJWT, updateUser); // Protect this route
router.delete('/:id', authenticateJWT, deleteUser); // Protect this route

module.exports = router;
