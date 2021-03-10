const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile_no: {
    type: String,
    required: true
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'address'
  }
});

module.exports = Supplier = mongoose.model('supplier', SupplierSchema);