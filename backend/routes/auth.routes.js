
const express = require('express');
const { check } = require('express-validator');
const { validate } = require('../middleware/validator');
const authController = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Register a new user
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('organization', 'Organization name is required').not().isEmpty(),
  ],
  validate,
  authController.register
);

// Login user
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  validate,
  authController.login
);

// Get current user
router.get('/me', protect, authController.getMe);

// Forgot password
router.post(
  '/forgot-password',
  [
    check('email', 'Please include a valid email').isEmail(),
  ],
  validate,
  authController.forgotPassword
);

// Reset password
router.put(
  '/reset-password/:resetToken',
  [
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  validate,
  authController.resetPassword
);

module.exports = router;
