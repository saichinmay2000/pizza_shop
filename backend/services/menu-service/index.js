const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('../../shared/database/connection');
const MenuItem = require('../../shared/models/MenuItem');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));


connectDB();

// Get all menu items
app.get('/menu', async (req, res) => {
    const items = await MenuItem.find();
    res.json(items);
});

// Add a new menu item
app.post('/menu', async (req, res) => {
    const { name, type, price } = req.body;
    const newItem = new MenuItem({ name, type, price });
    await newItem.save();
    res.status(201).json(newItem);
});

// Update a menu item
app.patch('/menu/:id', async (req, res) => {
    const { name, type, price } = req.body;
    const updatedItem = await MenuItem.findByIdAndUpdate(
        req.params.id,
        { name, type, price },
        { new: true }
    );
    if (!updatedItem) return res.status(404).send('Menu item not found');
    res.json(updatedItem);
});

// Delete a menu item
app.delete('/menu/:id', async (req, res) => {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).send('Menu item not found');
    res.json({ message: 'Menu item deleted', item: deletedItem });
});

const PORT = 5002;
app.listen(PORT, () => console.log(`Menu Service running on port ${PORT}`));
