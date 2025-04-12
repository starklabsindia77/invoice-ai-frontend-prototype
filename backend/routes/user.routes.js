
const express = require('express');
const { check } = require('express-validator');
const { validate } = require('../middleware/validator');
const userController = require('../controllers/user.controller');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// Get all users (admin only)
router.get('/', admin, userController.getUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

// Update user profile
router.put(
  '/profile',
  [
    check('name', 'Name is required').optional().not().isEmpty(),
    check('email', 'Please include a valid email').optional().isEmail(),
    check('organization', 'Organization name is required').optional().not().isEmpty(),
  ],
  validate,
  userController.updateProfile
);

// Change password
router.put(
  '/change-password',
  [
    check('currentPassword', 'Current password is required').not().isEmpty(),
    check('newPassword', 'New password must be at least 6 characters').isLength({ min: 6 }),
  ],
  validate,
  userController.changePassword
);

// Delete user (admin only)
router.delete('/:id', admin, userController.deleteUser);

module.exports = router;
