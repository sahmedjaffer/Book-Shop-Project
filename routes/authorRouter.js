const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController.js')

router.get('/', authorController.listAllAuthors);
router.get('/new', authorController.newAuthorPage);
router.get('/:id', authorController.listAuthorById);
router.put('/:id',authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);
router.get('/:id/edit', authorController.editAuthorPage);





module.exports = router;


