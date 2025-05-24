const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController.js')
const Author = require('../models/Author.js')

router.get('/', authorController.listAllAuthors);
router.get('/:id', authorController.listAuthorById);
router.put('/:id',authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);

router.get('/:id/edit', async (req, res) => {
  const authors = await Author.findById(req.params.id).populate('works');
  res.render('../views/authors/editAuthor.ejs', ({authors}))
})



module.exports = router;


