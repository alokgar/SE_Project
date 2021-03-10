const mongoose = require('mongoose');

const Raw_materialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
  },
  date_of_receiving: {
    type: Date,
    default: Date.now
  },
  unit: {
    type: String,
    required: true,
  },
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'supplier'
  }
});

module.exports = Raw_material = mongoose.model('raw_material', Raw_materialSchema);