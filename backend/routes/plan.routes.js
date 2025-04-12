
const express = require('express');
const { check } = require('express-validator');
const { validate } = require('../middleware/validator');
const planController = require('../controllers/plan.controller');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/active', planController.getActivePlans);

// Protected admin routes
router.use(protect);
router.use(admin);

// Get all plans
router.get('/', planController.getAllPlans);

// Get a specific plan
router.get('/:id', planController.getPlanById);

// Create a new plan
router.post(
  '/',
  [
    check('name', 'Plan name is required').not().isEmpty(),
    check('price', 'Price is required and must be a number').isNumeric(),
    check('billingCycle', 'Billing cycle is required').not().isEmpty(),
  ],
  validate,
  planController.createPlan
);

// Update a plan
router.put(
  '/:id',
  [
    check('price', 'Price must be a number').optional().isNumeric(),
    check('isActive', 'isActive must be a boolean').optional().isBoolean(),
  ],
  validate,
  planController.updatePlan
);

// Delete a plan
router.delete('/:id', planController.deletePlan);

module.exports = router;
