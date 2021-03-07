const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  joining_date: {
    type: Date,
    default: Date.now
  },
  mobile_no: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  salary: {
    type: Number
  },
  status: {
    type: String,
    default: "Pending"
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City'
  }
});

module.exports = User = mongoose.model('user', UserSchema);