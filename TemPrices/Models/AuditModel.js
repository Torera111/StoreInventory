const mongoose = require("mongoose");
/**
 * The AuditLog model is a schema used to track changes and actions performed on important documents in your application — like products in an inventory system.

It helps you answer questions like:

Who updated this product?

What was changed?

When did it happen?
 */

const auditLogSchema = new mongoose.Schema({
  action: {type: String, enum: ['create', 'update', 'delete'], required: true},
  //This is the name of the collection or schema being audited.
  //model': 'Product' means the log is about a Product document.
  model:{type: String, require: true },
  //This is the ID of the document that was changed
  documentId:{type: mongoose.Schema.Types.ObjectId, required: true },
  product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
 //This is the ID of the user that performed the action
  performedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
  changes: { type: Object }, // You can store a diff here
  timestamp: {type: Date, default: Date.now }
});

module.exports = mongoose.model('AuditLog', auditLogSchema);
