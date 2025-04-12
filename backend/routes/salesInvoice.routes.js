
const express = require('express');
const { check } = require('express-validator');
const { validate } = require('../middleware/validator');
const salesInvoiceController = require('../controllers/salesInvoice.controller');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// Get all sales invoices with filtering
router.get('/', salesInvoiceController.getAllSalesInvoices);

// Get a specific sales invoice
router.get('/:id', salesInvoiceController.getSalesInvoiceById);

// Create a new sales invoice
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
  salesInvoiceController.createSalesInvoice
);

// Update a sales invoice
router.put(
  '/:id',
  [
    check('vendor', 'Vendor is required').optional().not().isEmpty(),
    check('date', 'Valid date is required').optional().isISO8601().toDate(),
    check('status', 'Status must be Processed, Pending, or Failed').optional().isIn(['Processed', 'Pending', 'Failed']),
    check('items', 'Items must be an array').optional().isArray(),
  ],
  validate,
  salesInvoiceController.updateSalesInvoice
);

// Delete a sales invoice
router.delete('/:id', salesInvoiceController.deleteSalesInvoice);

// Update sales invoice status
router.patch(
  '/:id/status',
  [
    check('status', 'Status must be Processed, Pending, or Failed').isIn(['Processed', 'Pending', 'Failed']),
  ],
  validate,
  salesInvoiceController.updateSalesInvoiceStatus
);

// Export sales invoices to CSV
router.get('/export/csv', salesInvoiceController.exportSalesInvoicesToCsv);

// Sync sales invoices with accounting software
router.post('/sync', salesInvoiceController.syncSalesInvoicesWithAccounting);

module.exports = router;
