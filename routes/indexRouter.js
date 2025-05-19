const express = require('express');
const router = express.Router();
const Author = require('../models/Author');
const Book = require('../models/Book');
const Order = require('../models/Order');

// Homepage route
router.get('/', async (req, res) => {
    try {
        const authors = await Author.find().limit(4).populate('works');
        const books = await Book.find().limit(4).populate('author');
        const orders = await Order.find().limit(5).sort({ date: -1 });
        res.render('index', { authors, books, orders });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;