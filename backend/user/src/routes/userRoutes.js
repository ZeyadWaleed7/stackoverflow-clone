const express = require('express');
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile
} = require('../controllers/userController');

const { authenticateJWT } = require('../middlewares/authMiddleware');

router.get('/userprofile', authenticateJWT, getUserProfile);

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', authenticateJWT, getUserById);
router.put('/:id', authenticateJWT, updateUser);
router.delete('/:id', authenticateJWT, deleteUser);

module.exports = router;
