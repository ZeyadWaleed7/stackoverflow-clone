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

router.post('/', createUser); 


router.get('/userprofile', authenticateJWT, (req, res) => {
  res.json({
    message: 'Token is valid!',
    userId: req.user.userId,
    name: req.user.name
  });
});

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', authenticateJWT, getUserById);
router.put('/:id', authenticateJWT, updateUser);
router.delete('/:id', authenticateJWT, deleteUser);

module.exports = router;
