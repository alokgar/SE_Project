const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  line1: {
    type: String,
    required: true
  },
  landmark: {
    type: String,
    required: true
  },
  pincode: {
    type: Number,
    required: true
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'city'
  }
});

module.exports = Address = mongoose.model('address', AddressSchema);