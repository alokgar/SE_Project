const mongoose = require('mongoose');

const OrderDetailSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    require: true
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }
});

module.exports = OrderDetail = mongoose.model('orderdetail', OrderDetailDetailSchema);