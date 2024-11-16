const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('../../shared/database/connection');
const Order = require('../../shared/models/Order');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));

connectDB();

// Routes
app.post('/orders', async (req, res) => {
    const { customerId, items, totalAmount } = req.body;
    const newOrder = new Order({ customerId, items, totalAmount, status: 'pending' });
    await newOrder.save();
    res.status(201).json(newOrder);
});

app.get('/orders/:id', async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send('Order not found');
    res.json(order);
});

app.patch('/orders/:id/status', async (req, res) => {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).send('Order not found');
    res.json(order);
});

app.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));
