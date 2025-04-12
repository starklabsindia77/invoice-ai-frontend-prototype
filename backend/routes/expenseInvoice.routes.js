
const express = require('express');
const { check } = require('express-validator');
const { validate } = require('../middleware/validator');
const expenseInvoiceController = require('../controllers/expenseInvoice.controller');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// Get all expense invoices with filtering
router.get('/', expenseInvoiceController.getAllExpenseInvoices);

// Get a specific expense invoice
router.get('/:id', expenseInvoiceController.getExpenseInvoiceById);

// Create a new expense invoice
router.post(
  '/',
  [
    check('vendor', 'Vendor is required').not().isEmpty(),
    check('date', 'Valid date is required').isISO8601().toDate(),
    check('gstId', 'GST ID is required').not().isEmpty(),
    check('items', 'At least one item is required').isArray({ min: 1 }),
    check('items.*.description', 'Item description is required').not().isEmpty(),
    check('items.*.quantity', 'Item quantity is required').isNumeric(),
    check('items.*.price', 'Item price is required').isNumeric(),
  ],
  validate,
  expenseInvoiceController.createExpenseInvoice
);

// Update an expense invoice
router.put(
  '/:id',
  [
    check('vendor', 'Vendor is required').optional().not().isEmpty(),
    check('date', 'Valid date is required').optional().isISO8601().toDate(),
    check('status', 'Status must be Processed, Pending, or Failed').optional().isIn(['Processed', 'Pending', 'Failed']),
    check('items', 'Items must be an array').optional().isArray(),
  ],
  validate,
  expenseInvoiceController.updateExpenseInvoice
);

// Delete an expense invoice
router.delete('/:id', expenseInvoiceController.deleteExpenseInvoice);

// Update expense invoice status
router.patch(
  '/:id/status',
  [
    check('status', 'Status must be Processed, Pending, or Failed').isIn(['Processed', 'Pending', 'Failed']),
  ],
  validate,
  expenseInvoiceController.updateExpenseInvoiceStatus
);

// Process GST filing for an expense invoice
router.post(
  '/:id/gst-filing',
  [
    check('gstFilingStatus', 'GST filing status is required').isIn(['Filed', 'Pending', 'Not Applicable']),
    check('gstFilingPeriod', 'GST filing period is required').not().isEmpty(),
  ],
  validate,
  expenseInvoiceController.processGstFiling
);

// Export expense invoices to CSV
router.get('/export/csv', expenseInvoiceController.exportExpenseInvoicesToCsv);

// Sync expense invoices with accounting software
router.post('/sync', expenseInvoiceController.syncExpenseInvoicesWithAccounting);

module.exports = router;
