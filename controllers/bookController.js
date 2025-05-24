const chalk = require('chalk');
const Book = require('../models/Book.js');
const Author = require('../models/Author.js');
const User = require('../models/User.js');

const listAllBooks = async (req, res) => {
    try {
     
        const allBooks = await Book.find().populate('author');
       if(!allBooks){
            res.render('./books/bookNotFound.ejs');
       }else{
    let userRole = null;
    if (req.session.user && req.session.user._id) {
        userRole = await User.findById(req.session.user._id);
    }

    res.render('../views/books/allBooks.ejs', { allBooks, userRole });  
    }}
        //return res.send({allBooks});
     catch (error) {
        console.error(`${chalk.red('Error occurred in listing all book ', error.message)}`)
    } }

const listBookById = async (req, res) => {
  try {
    const bookById = await Book.findById(req.params.id).populate('author');
    const booksCart = [];

    if (!bookById) {
      return res.render('./books/bookNotFound.ejs', { bookById: null });
    }

    let userRole = null;
    if (req.session.user && req.session.user._id) {
      userRole = await User.findById(req.session.user._id);
    }

    return res.render('../views/books/showBook.ejs', { bookById, booksCart, userRole });

  } catch (error) {
    console.error(`Error occurred in listing book by id: ${error.message}`);
    return res.send('Internal Server Error');
  }
};

    
const updateBook = async (req, res) => {
    try {
         const updateBookById = await Book.findByIdAndUpdate(req.params.id, req.body, {new:true});
         if(!updateBookById){
            res.render('./books/bookNotFound.ejs');
         };
         return res.send(`Book ${updateBookById.title} has been updated` + updateBookById);
    } catch (error) {
         console.error(`${chalk.red('Error occurred in updating book ', error.message)}`);
    };
};


const createNewBook = async (req, res) => {
  try {
    const {
      isbn,
      title,
      description,
      unitPrice,
      stock,
      category,
      publisher,
      image,
      authorId,
      newAuthorName,
      newAuthorBiography
    } = req.body;

    const bookInDatabase = await Book.findOne({ isbn });

    if (bookInDatabase) {
      return res.redirect(`/books/${bookInDatabase._id}`);
    }

    let author;

    if (authorId) {
      // If existing author was selected
      author = await Author.findById(authorId);
      if (!author) {
        return res.status(400).send('Author not found');
      }
    } else {
      // Create new author
      author = await Author.create({
        name: newAuthorName,
        biography: newAuthorBiography,
        works: []
      });
    }

    // Create the book
    const book = await Book.create({
      isbn,
      title,
      description,
      unitPrice,
      stock,
      category,
      publisher,
      image,
      author: author._id
    });

    // Update author's works
    author.works.push(book._id);
    await author.save();

    return res.redirect(`/books/${book._id}`);
  } catch (error) {
    console.error(`Error occurred in creating book: ${error.message}`);
    return res.status(500).send('Internal Server Error');
  }
};


const deleteBook = async (req, res) => {
    try {
        const deleteBookById = await Book.findByIdAndDelete(req.params.id);
        if(!deleteBookById){
           // return res.send(`the Book with the id ${req.params.id} not found`);
            res.redirect(`/books`);
        }else {
       // res.send (`${deleteBookById.title} has been deleted successfully` + deleteBookById)
       res.render('/books/confirm.ejs', {deleteBookById});
        }
    } catch (error) {
             console.error(`${chalk.red('Error occurred in deleting book ', error.message)}`)
    }   
}

module.exports = {
    listAllBooks,
    listBookById,
    updateBook,
    deleteBook,
    createNewBook,
}