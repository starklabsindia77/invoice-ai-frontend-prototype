
const mongoose = require('mongoose');

const invoiceItemSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Please provide an item description'],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide a quantity'],
    min: [0, 'Quantity cannot be negative'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative'],
  },
  hsn: {
    type: String,
    trim: true,
  },
  taxRate: {
    type: Number,
    default: 0,
  },
  taxAmount: {
    type: Number,
    default: 0,
  },
});

const invoiceSchema = new mongoose.Schema({
  vendor: {
    type: String,
    required: [true, 'Please provide a vendor name'],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, 'Please provide an invoice amount'],
    min: [0, 'Amount cannot be negative'],
  },
  date: {
    type: Date,
    required: [true, 'Please provide an invoice date'],
  },
  status: {
    type: String,
    enum: ['Processed', 'Pending', 'Failed'],
    default: 'Pending',
  },
  gstId: {
    type: String,
    required: [true, 'Please provide a GST ID'],
    trim: true,
  },
  category: {
    type: String,
    enum: ['sales', 'expense'],
    required: [true, 'Please specify an invoice category'],
  },
  tags: [{
    type: String,
    trim: true,
  }],
  items: [invoiceItemSchema],
  language: {
    type: String,
    default: 'en',
  },
  currency: {
    type: String,
    default: 'INR',
  },
  gstType: {
    type: String,
    enum: ['CGST/SGST', 'IGST', 'Exempt'],
  },
  gstFilingStatus: {
    type: String,
    enum: ['Filed', 'Pending', 'Not Applicable'],
    default: 'Pending',
  },
  gstFilingPeriod: {
    type: String,
  },
  placeOfSupply: {
    type: String,
  },
  reverseCharge: {
    type: Boolean,
    default: false,
  },
  eInvoiceNumber: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Calculate total amount before saving
invoiceSchema.pre('save', function(next) {
  let totalAmount = 0;
  this.items.forEach(item => {
    const itemTotal = item.price * item.quantity;
    const taxAmount = (itemTotal * item.taxRate) / 100;
    item.taxAmount = taxAmount;
    totalAmount += itemTotal + taxAmount;
  });
  this.amount = totalAmount;
  next();
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
