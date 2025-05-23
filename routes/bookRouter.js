const express = require('express');
const router = express.Router();
const Book = require('../models/Book.js');
const Author = require('../models/Author.js')
const bookController = require('../controllers/bookController.js')

router.post('/', bookController.createNewBook);
router.get('/', bookController.listAllBooks);
router.get('/new', async (req, res) => {
    try {
    const authors = await Author.find();
      res.render('./books/newBook.ejs', { authors });
  } catch (err) {
    res.send('Error loading form');
  }
})
router.get('/:id', bookController.listBookById);
router.put('/:id',bookController.updateBook);
router.delete('/:id', bookController.deleteBook);


router.get('/:id/edit', async (req, res) => {
  const book = await Book.findById(req.params.id).populate('author')
  const authors = await Author.find().populate('works');
  res.render('../views/books/editBook.ejs', ({ book , authors}))
})

module.exports = router;