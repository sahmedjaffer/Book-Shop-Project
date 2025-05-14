const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController.js')


router.get('/', bookController.listAllBooks);
router.get('/:id', bookController.listBookById);
router.post('/new', bookController.createNewBook);
router.put('/:id',bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;