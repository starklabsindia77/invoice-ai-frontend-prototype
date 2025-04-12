
const express = require('express');
const { check } = require('express-validator');
const { validate } = require('../middleware/validator');
const tenantController = require('../controllers/tenant.controller');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);
router.use(admin);

// Get all tenants
router.get('/', tenantController.getAllTenants);

// Get a specific tenant
router.get('/:id', tenantController.getTenantById);

// Create a new tenant
router.post(
  '/',
  [
    check('name', 'Tenant name is required').not().isEmpty(),
  ],
  validate,
  tenantController.createTenant
);

// Update a tenant
router.put(
  '/:id',
  [
    check('domain', 'Domain must be a valid URL').optional().isURL(),
    check('status', 'Status must be active or inactive').optional().isIn(['active', 'inactive']),
  ],
  validate,
  tenantController.updateTenant
);

// Delete a tenant
router.delete('/:id', tenantController.deleteTenant);

// Get all subscriptions for a tenant
router.get('/:id/subscriptions', tenantController.getTenantSubscriptions);

// Create a new subscription for a tenant
router.post(
  '/:id/subscriptions',
  [
    check('planId', 'Plan ID is required').not().isEmpty(),
    check('startDate', 'Start date must be a valid date').optional().isISO8601().toDate(),
    check('endDate', 'End date must be a valid date').optional().isISO8601().toDate(),
    check('status', 'Status must be active or inactive').optional().isIn(['active', 'inactive']),
  ],
  validate,
  tenantController.createTenantSubscription
);

module.exports = router;
