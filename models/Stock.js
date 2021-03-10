const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    last_update: {
        type: Date,
        default: Date.now
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    size_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'size'
    }

});

module.exports = Stock = mongoose.model('stock', StockSchema);