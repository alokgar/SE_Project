const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  status: {
    type: String,
    default: "Notconfirmed"
  },
  order_date: {
    type: Date,
    default: Date.now
  },
  dispatched_date: {
    type: Date,
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = Order = mongoose.model('order', OrderSchema);