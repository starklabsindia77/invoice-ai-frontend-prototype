
const PostgresModel = require('./PostgresModel');

class InvoiceItemModel extends PostgresModel {
  constructor() {
    super('invoice_items');
  }
}

module.exports = new InvoiceItemModel();
