const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
    },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
      type: String,
      default: "Sent"
  },
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = Feedback = mongoose.model('feedback', CustomerSchema);