const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
} = require('../controller/userController');

// Register a user
// POST /api/users
router.post('/', registerUser);

// Login a user
// POST /api/users/login
router.post('/login', loginUser);

// Get user profile
// GET /api/users/profile
router.get('/profile', auth, getUserProfile);

// Update user profile
// PUT /api/users/profile
router.put('/profile', auth, updateUserProfile);

module.exports = router;
