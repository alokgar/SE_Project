const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer'
  },
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = Payment = mongoose.model('payment', PaymentSchema);