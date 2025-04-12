
const { Tenant, Subscription, Plan } = require('../models');
const { createTenantSchema } = require('../config/database');
const logger = require('../utils/logger');
const Sentry = require('@sentry/node');

// @desc    Get all tenants
// @route   GET /api/tenants
// @access  Private/Admin
exports.getAllTenants = async (req, res, next) => {
  try {
    const tenants = await Tenant.find({}, {
      sort: { createdAt: -1 }
    });
    
    res.status(200).json({
      success: true,
      data: tenants
    });
  } catch (error) {
    logger.error(`Get all tenants error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Get a tenant
// @route   GET /api/tenants/:id
// @access  Private/Admin
exports.getTenantById = async (req, res, next) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    
    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: 'Tenant not found'
      });
    }
    
    // Get active subscription
    const subscription = await Subscription.getActiveTenantSubscription(tenant.id);
    
    res.status(200).json({
      success: true,
      data: {
        ...tenant,
        subscription
      }
    });
  } catch (error) {
    logger.error(`Get tenant by ID error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Create a new tenant
// @route   POST /api/tenants
// @access  Private/Admin
exports.createTenant = async (req, res, next) => {
  try {
    const { name, domain, planId } = req.body;
    
    // Check if tenant already exists
    const existingTenant = await Tenant.findByName(name);
    if (existingTenant) {
      return res.status(400).json({
        success: false,
        message: 'Tenant with this name already exists'
      });
    }
    
    // Check if domain already exists
    if (domain) {
      const existingDomain = await Tenant.findByDomain(domain);
      if (existingDomain) {
        return res.status(400).json({
          success: false,
          message: 'Tenant with this domain already exists'
        });
      }
    }
    
    // Create schema name
    const schemaName = `tenant_${name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    
    // Create tenant
    const tenant = await Tenant.create({
      name,
      schemaName,
      domain,
      status: 'active'
    });
    
    // Create schema and tables
    await createTenantSchema(name);
    
    // Create subscription if planId is provided
    if (planId) {
      const plan = await Plan.findById(planId);
      
      if (!plan) {
        return res.status(404).json({
          success: false,
          message: 'Plan not found'
        });
      }
      
      await Subscription.create({
        tenantId: tenant.id,
        planId,
        status: 'active',
        startDate: new Date(),
        billingCycle: plan.billingCycle
      });
    }
    
    res.status(201).json({
      success: true,
      data: tenant
    });
  } catch (error) {
    logger.error(`Create tenant error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Update a tenant
// @route   PUT /api/tenants/:id
// @access  Private/Admin
exports.updateTenant = async (req, res, next) => {
  try {
    const { name, domain, status } = req.body;
    
    let tenant = await Tenant.findById(req.params.id);
    
    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: 'Tenant not found'
      });
    }
    
    // Check if the domain is already in use by another tenant
    if (domain && domain !== tenant.domain) {
      const existingDomain = await Tenant.findByDomain(domain);
      if (existingDomain && existingDomain.id !== tenant.id) {
        return res.status(400).json({
          success: false,
          message: 'Domain is already in use'
        });
      }
    }
    
    // Update tenant
    const updateData = {};
    if (domain) updateData.domain = domain;
    if (status) updateData.status = status;
    
    // Don't allow name change as it's used for schema name
    if (name && name !== tenant.name) {
      return res.status(400).json({
        success: false,
        message: 'Tenant name cannot be changed as it affects the database schema'
      });
    }
    
    tenant = await Tenant.update(tenant.id, updateData);
    
    res.status(200).json({
      success: true,
      data: tenant
    });
  } catch (error) {
    logger.error(`Update tenant error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Delete a tenant
// @route   DELETE /api/tenants/:id
// @access  Private/Admin
exports.deleteTenant = async (req, res, next) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    
    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: 'Tenant not found'
      });
    }
    
    // Instead of actually deleting, we'll set status to inactive
    // As deleting schemas and data is a serious operation and may need a more controlled process
    await Tenant.update(tenant.id, { status: 'inactive' });
    
    res.status(200).json({
      success: true,
      message: 'Tenant marked as inactive'
    });
  } catch (error) {
    logger.error(`Delete tenant error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Get all subscriptions for a tenant
// @route   GET /api/tenants/:id/subscriptions
// @access  Private/Admin
exports.getTenantSubscriptions = async (req, res, next) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    
    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: 'Tenant not found'
      });
    }
    
    const subscriptions = await Subscription.findByTenantId(tenant.id);
    
    res.status(200).json({
      success: true,
      data: subscriptions
    });
  } catch (error) {
    logger.error(`Get tenant subscriptions error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Create a subscription for a tenant
// @route   POST /api/tenants/:id/subscriptions
// @access  Private/Admin
exports.createTenantSubscription = async (req, res, next) => {
  try {
    const { planId, startDate, endDate, status, billingCycle } = req.body;
    
    const tenant = await Tenant.findById(req.params.id);
    
    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: 'Tenant not found'
      });
    }
    
    const plan = await Plan.findById(planId);
    
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }
    
    // If creating a new active subscription, deactivate existing active subscriptions
    if (status === 'active') {
      const activeSubscription = await Subscription.getActiveTenantSubscription(tenant.id);
      
      if (activeSubscription) {
        await Subscription.update(activeSubscription.id, { status: 'inactive' });
      }
    }
    
    const subscription = await Subscription.create({
      tenantId: tenant.id,
      planId,
      status: status || 'active',
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : null,
      billingCycle: billingCycle || plan.billingCycle,
      price: plan.price
    });
    
    res.status(201).json({
      success: true,
      data: subscription
    });
  } catch (error) {
    logger.error(`Create tenant subscription error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};
