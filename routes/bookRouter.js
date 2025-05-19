const express = require('express');
const router = express.Router();
const Book = require('../models/Book.js')
const Author = require('../models/Author.js')
const bookController = require('../controllers/bookController.js')


router.get('/', bookController.listAllBooks);
router.get('/:id', bookController.listBookById);
router.post('/', bookController.createNewBook);
router.put('/:id/edit',bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

router.get('/:id/edit', async (req, res) => {
  const book = await Book.findById(req.params.id).populate('author')
    const authors = await Author.find(); // to allow selecting another author in the form
  res.render('./books/edit.ejs', { book, authors });
})

module.exports = router;