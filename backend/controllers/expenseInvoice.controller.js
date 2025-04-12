
const { Invoice } = require('../models');
const logger = require('../utils/logger');
const Sentry = require('@sentry/node');

// @desc    Get all expense invoices
// @route   GET /api/invoices/expenses
// @access  Private
exports.getAllExpenseInvoices = async (req, res, next) => {
  try {
    // Build filter object
    const filter = { 
      category: 'expense',
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
    if (req.query.gstFilingStatus) filter.gstFilingStatus = req.query.gstFilingStatus;
    
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
    logger.error(`Get all expense invoices error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Get a specific expense invoice
// @route   GET /api/invoices/expenses/:id
// @access  Private
exports.getExpenseInvoiceById = async (req, res, next) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      category: 'expense',
      user: req.user.id
    });
    
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Expense invoice not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: invoice
    });
  } catch (error) {
    logger.error(`Get expense invoice by ID error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Create a new expense invoice
// @route   POST /api/invoices/expenses
// @access  Private
exports.createExpenseInvoice = async (req, res, next) => {
  try {
    // Add user and organization to invoice data
    req.body.user = req.user.id;
    req.body.organization = req.user.organization;
    req.body.category = 'expense';
    
    const invoice = await Invoice.create(req.body);
    
    res.status(201).json({
      success: true,
      data: invoice
    });
  } catch (error) {
    logger.error(`Create expense invoice error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Update an expense invoice
// @route   PUT /api/invoices/expenses/:id
// @access  Private
exports.updateExpenseInvoice = async (req, res, next) => {
  try {
    let invoice = await Invoice.findOne({
      _id: req.params.id,
      category: 'expense',
      user: req.user.id
    });
    
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Expense invoice not found'
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
    logger.error(`Update expense invoice error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Delete an expense invoice
// @route   DELETE /api/invoices/expenses/:id
// @access  Private
exports.deleteExpenseInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      category: 'expense',
      user: req.user.id
    });
    
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Expense invoice not found'
      });
    }
    
    await invoice.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Expense invoice deleted successfully'
    });
  } catch (error) {
    logger.error(`Delete expense invoice error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Update expense invoice status
// @route   PATCH /api/invoices/expenses/:id/status
// @access  Private
exports.updateExpenseInvoiceStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    let invoice = await Invoice.findOne({
      _id: req.params.id,
      category: 'expense',
      user: req.user.id
    });
    
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Expense invoice not found'
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
    logger.error(`Update expense invoice status error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Process GST filing for an expense invoice
// @route   POST /api/invoices/expenses/:id/gst-filing
// @access  Private
exports.processGstFiling = async (req, res, next) => {
  try {
    const { gstFilingStatus, gstFilingPeriod } = req.body;
    
    let invoice = await Invoice.findOne({
      _id: req.params.id,
      category: 'expense',
      user: req.user.id
    });
    
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Expense invoice not found'
      });
    }
    
    // Update GST filing information
    invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { gstFilingStatus, gstFilingPeriod },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: invoice
    });
  } catch (error) {
    logger.error(`Process GST filing error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Export expense invoices to CSV
// @route   GET /api/invoices/expenses/export/csv
// @access  Private
exports.exportExpenseInvoicesToCsv = async (req, res, next) => {
  try {
    // Filter logic similar to getAllExpenseInvoices
    const filter = { 
      category: 'expense',
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
    if (req.query.gstFilingStatus) filter.gstFilingStatus = req.query.gstFilingStatus;
    
    const invoices = await Invoice.find(filter).sort({ date: -1 });
    
    // Generate CSV (implementation would depend on a CSV library)
    // For demonstration, we'll just return JSON
    res.status(200).json({
      success: true,
      message: 'CSV export functionality would be implemented here',
      count: invoices.length
    });
  } catch (error) {
    logger.error(`Export expense invoices to CSV error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};

// @desc    Sync expense invoices with accounting software
// @route   POST /api/invoices/expenses/sync
// @access  Private
exports.syncExpenseInvoicesWithAccounting = async (req, res, next) => {
  try {
    // This would integrate with accounting software API
    // For demonstration, we'll just return a success message
    res.status(200).json({
      success: true,
      data: {
        message: 'Expense invoices sync initiated. Integration with accounting software would be implemented here.'
      }
    });
  } catch (error) {
    logger.error(`Sync expense invoices error: ${error.message}`);
    Sentry.captureException(error);
    next(error);
  }
};
