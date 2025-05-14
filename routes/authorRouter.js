const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController.js')


router.get('/', authorController.listAllAuthors);
router.get('/:id', authorController.listAuthorById);
router.post('/', authorController.createNewAuthor);
router.put('/:id',authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;


