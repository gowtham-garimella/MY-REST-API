const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data
let items = [
    { id: 1, name: 'KUMAR AAYUSH',reg:"RA2111008020003",email:"ka3455@srmist.edu.in" },
    { id: 2, name: 'SREYA GUHA',reg:"RA2111008020018",email:"sm8455@semist.edu.in" }
];

// Get all items
app.get('/items', (req, res) => {
    res.json(items);
});

// Get a specific item
app.get('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    const item = items.find(i => i.id === itemId);
    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
});

// Create a new item
app.post('/items', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Bad request' });
    }
    const newItem = {
        id: items.length ? items[items.length - 1].id + 1 : 1,
        name
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Update an existing item
app.put('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    const { name } = req.body;
    const item = items.find(i => i.id === itemId);
    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }
    if (!name) {
        return res.status(400).json({ error: 'Bad request' });
    }
    item.name = name;
    res.json(item);
});

// Delete an item
app.delete('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    items = items.filter(i => i.id !== itemId);
    res.json({ result: 'Item deleted' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
