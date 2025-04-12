
const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const salesInvoiceRoutes = require('./salesInvoice.routes');
const expenseInvoiceRoutes = require('./expenseInvoice.routes');
const tenantRoutes = require('./tenant.routes');
const planRoutes = require('./plan.routes');

// Define routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/invoices/sales', salesInvoiceRoutes);
router.use('/invoices/expenses', expenseInvoiceRoutes);
router.use('/tenants', tenantRoutes);
router.use('/plans', planRoutes);

module.exports = router;
