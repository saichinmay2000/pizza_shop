const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['pizza', 'soda'], required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
