const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  status: {
    type: String,
    default: "Pending"
  },
  order_date: {
    type: Date,
    default: Date.now
  },
  dispatched_date: {
    type: Date,
  },
  dispatch_num: {
     type : Number,
     default: -1
  },
  details: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true},
      quantity: {type: Number, require: true},
      size_id: {type: mongoose.Schema.Types.ObjectId,ref: 'size',required:true}
    }
  ],
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer',
    required:true
  },
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required:true
  }
});

module.exports = Order = mongoose.model('order', OrderSchema);