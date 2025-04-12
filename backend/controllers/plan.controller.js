
const { Plan } = require('../models');
const logger = require('../utils/logger');
const Sentry = require('@sentry/node');

// @desc    Get all plans
// @route   GET /api/plans
// @access  Private/Admin
exports.getAllPlans = async (req, res, next) => {
  try {
    const plans = await Plan.find({}, {
      sort: { price: 1 }
    });
    
    res.status(200).json({
      success: true,
      data: plans
    });
  } catch (error) {
    logger.error(`Get all plans error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Get active plans
// @route   GET /api/plans/active
// @access  Public
exports.getActivePlans = async (req, res, next) => {
  try {
    const plans = await Plan.getActivePlans();
    
    res.status(200).json({
      success: true,
      data: plans
    });
  } catch (error) {
    logger.error(`Get active plans error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Get a plan
// @route   GET /api/plans/:id
// @access  Private/Admin
exports.getPlanById = async (req, res, next) => {
  try {
    const plan = await Plan.findById(req.params.id);
    
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: plan
    });
  } catch (error) {
    logger.error(`Get plan by ID error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Create a new plan
// @route   POST /api/plans
// @access  Private/Admin
exports.createPlan = async (req, res, next) => {
  try {
    const { name, description, price, billingCycle, features, isActive } = req.body;
    
    const plan = await Plan.create({
      name,
      description,
      price,
      billingCycle,
      features: features ? JSON.stringify(features) : null,
      isActive: isActive !== undefined ? isActive : true
    });
    
    res.status(201).json({
      success: true,
      data: plan
    });
  } catch (error) {
    logger.error(`Create plan error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Update a plan
// @route   PUT /api/plans/:id
// @access  Private/Admin
exports.updatePlan = async (req, res, next) => {
  try {
    const { name, description, price, billingCycle, features, isActive } = req.body;
    
    let plan = await Plan.findById(req.params.id);
    
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }
    
    // Update plan
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (billingCycle !== undefined) updateData.billingCycle = billingCycle;
    if (features !== undefined) updateData.features = JSON.stringify(features);
    if (isActive !== undefined) updateData.isActive = isActive;
    
    plan = await Plan.update(plan.id, updateData);
    
    res.status(200).json({
      success: true,
      data: plan
    });
  } catch (error) {
    logger.error(`Update plan error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Delete a plan
// @route   DELETE /api/plans/:id
// @access  Private/Admin
exports.deletePlan = async (req, res, next) => {
  try {
    const plan = await Plan.findById(req.params.id);
    
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }
    
    // Instead of actually deleting, mark as inactive
    await Plan.update(plan.id, { isActive: false });
    
    res.status(200).json({
      success: true,
      message: 'Plan marked as inactive'
    });
  } catch (error) {
    logger.error(`Delete plan error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};
