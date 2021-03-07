const mongoose = require('mongoose');

const SizeSchema = new mongoose.Schema({
  packing_type: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  }
});

module.exports = Size = mongoose.model('size', SizeSchema);