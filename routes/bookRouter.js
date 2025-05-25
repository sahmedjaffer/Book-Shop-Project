const express = require('express');
const router = express.Router();
const Book = require('../models/Book.js');
const Author = require('../models/Author.js')
const bookController = require('../controllers/bookController.js')

router.post('/', bookController.createNewBook);
router.get('/', bookController.listAllBooks);
router.get('/new', bookController.newBookPage)
router.get('/:id', bookController.listBookById);
router.put('/:id',bookController.updateBook);
router.delete('/:id', bookController.deleteBook);
router.get('/:id/edit', bookController.editBookPage)

module.exports = router;