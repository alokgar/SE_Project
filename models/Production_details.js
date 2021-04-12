const mongoose = require('mongoose');

const Production_detailsSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    size_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'size'
    },
    prev_quantity: {
        type: Number,
        required: true,
    },
    new_quantity: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Production_details = mongoose.model('production_details', Production_detailsSchema);