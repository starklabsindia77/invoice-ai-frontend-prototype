
const { Invoice } = require('../models');
const logger = require('../utils/logger');
const Sentry = require('@sentry/node');

// @desc    Get all sales invoices
// @route   GET /api/invoices/sales
// @access  Private
exports.getAllSalesInvoices = async (req, res, next) => {
  try {
    // Build filter object
    const filter = { 
      category: 'sales',
      user: req.user.id,
      organization: req.user.organization
    };
    
    // Add additional filters if provided
    if (req.query.status) filter.status = req.query.status;
    if (req.query.dateFrom || req.query.dateTo) {
      filter.date = {};
      if (req.query.dateFrom) filter.date.$gte = new Date(req.query.dateFrom);
      if (req.query.dateTo) filter.date.$lte = new Date(req.query.dateTo);
    }
    if (req.query.search) {
      filter.$or = [
        { vendor: { $regex: req.query.search, $options: 'i' } },
        { gstId: { $regex: req.query.search, $options: 'i' } },
      ];
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Query with filters and pagination
    const total = await Invoice.countDocuments(filter);
    const invoices = await Invoice.find(filter)
      .sort({ date: -1 })
      .skip(startIndex)
      .limit(limit);
    
    res.status(200).json({
      success: true,
      data: {
        data: invoices,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error(`Get all sales invoices error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Get a specific sales invoice
// @route   GET /api/invoices/sales/:id
// @access  Private
exports.getSalesInvoiceById = async (req, res, next) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      category: 'sales',
      user: req.user.id
    });
    
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Sales invoice not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: invoice
    });
  } catch (error) {
    logger.error(`Get sales invoice by ID error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Create a new sales invoice
// @route   POST /api/invoices/sales
// @access  Private
exports.createSalesInvoice = async (req, res, next) => {
  try {
    // Add user and organization to invoice data
    req.body.user = req.user.id;
    req.body.organization = req.user.organization;
    req.body.category = 'sales';
    
    const invoice = await Invoice.create(req.body);
    
    res.status(201).json({
      success: true,
      data: invoice
    });
  } catch (error) {
    logger.error(`Create sales invoice error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Update a sales invoice
// @route   PUT /api/invoices/sales/:id
// @access  Private
exports.updateSalesInvoice = async (req, res, next) => {
  try {
    let invoice = await Invoice.findOne({
      _id: req.params.id,
      category: 'sales',
      user: req.user.id
    });
    
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Sales invoice not found'
      });
    }
    
    // Update invoice
    invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: invoice
    });
  } catch (error) {
    logger.error(`Update sales invoice error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Delete a sales invoice
// @route   DELETE /api/invoices/sales/:id
// @access  Private
exports.deleteSalesInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      category: 'sales',
      user: req.user.id
    });
    
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Sales invoice not found'
      });
    }
    
    await invoice.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Sales invoice deleted successfully'
    });
  } catch (error) {
    logger.error(`Delete sales invoice error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Update sales invoice status
// @route   PATCH /api/invoices/sales/:id/status
// @access  Private
exports.updateSalesInvoiceStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    let invoice = await Invoice.findOne({
      _id: req.params.id,
      category: 'sales',
      user: req.user.id
    });
    
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Sales invoice not found'
      });
    }
    
    // Update status
    invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: invoice
    });
  } catch (error) {
    logger.error(`Update sales invoice status error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Export sales invoices to CSV
// @route   GET /api/invoices/sales/export/csv
// @access  Private
exports.exportSalesInvoicesToCsv = async (req, res, next) => {
  try {
    // Filter logic similar to getAllSalesInvoices
    const filter = { 
      category: 'sales',
      user: req.user.id,
      organization: req.user.organization
    };
    
    // Add additional filters if provided
    if (req.query.status) filter.status = req.query.status;
    if (req.query.dateFrom || req.query.dateTo) {
      filter.date = {};
      if (req.query.dateFrom) filter.date.$gte = new Date(req.query.dateFrom);
      if (req.query.dateTo) filter.date.$lte = new Date(req.query.dateTo);
    }
    
    const invoices = await Invoice.find(filter).sort({ date: -1 });
    
    // Generate CSV (implementation would depend on a CSV library)
    // For demonstration, we'll just return JSON
    res.status(200).json({
      success: true,
      message: 'CSV export functionality would be implemented here',
      count: invoices.length
    });
  } catch (error) {
    logger.error(`Export sales invoices to CSV error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Sync sales invoices with accounting software
// @route   POST /api/invoices/sales/sync
// @access  Private
exports.syncSalesInvoicesWithAccounting = async (req, res, next) => {
  try {
    // This would integrate with accounting software API
    // For demonstration, we'll just return a success message
    res.status(200).json({
      success: true,
      data: {
        message: 'Sales invoices sync initiated. Integration with accounting software would be implemented here.'
      }
    });
  } catch (error) {
    logger.error(`Sync sales invoices error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};
