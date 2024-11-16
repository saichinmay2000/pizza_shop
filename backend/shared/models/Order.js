const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customerId: { type: String, required: true },
    items: [
        {
            itemId: { type: String, required: true },
            type: { type: String, required: true },
            quantity: { type: Number, required: true },
        }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'in progress', 'completed'], default: 'pending' }
});

module.exports = mongoose.model('Order', OrderSchema);
