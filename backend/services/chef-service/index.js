const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('../../shared/database/connection');
const Order = require('../../shared/models/Order');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
}));

connectDB();

// Calculate preparation time and update order status
app.post('/chef/process', async (req, res) => {
    try {
        const { orderId } = req.body;
        const order = await Order.findById(orderId).populate('items._id');
        if (!order) return res.status(404).send('Order not found');


        const pizzaItems = order.items.filter(item => item.type === 'pizza');
        const totalPizzas = pizzaItems.reduce((sum, item) => sum + item.quantity, 0);
        const prepTime = totalPizzas * 5;


        console.log(`Order ${orderId}: Estimated preparation time is ${prepTime} minutes`);


        order.status = 'in progress';
        await order.save();


        res.json({ orderId: orderId, estimatedTime: prepTime });
    } catch (error) {
        console.error('Error processing the order:', error);
        res.status(500).send('An error occurred while processing the order');
    }
});

// Mark order as completed
app.patch('/chef/complete/:id', async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send('Order not found');


    order.status = 'completed';
    await order.save();

    res.json({ message: 'Order completed', order });
});


const PORT = 5003;
app.listen(PORT, () => console.log(`Chef Service running on port ${PORT}`));
