const chalk = require('chalk');
const Book = require('../models/Book.js');
const Author = require('../models/Author.js');

const listAllBooks = async (req, res) => {
    try {
        const allBooks = await Book.find().populate('author');
       //return res.send({allBooks});
        res.render('../views/books/all.ejs', {allBooks})

    } catch (error) {
        console.error(`${chalk.red('Error occurred in listing all book ', error.message)}`)
    } 
}
const listBookById = async (req, res) => {
    try {
        const bookById = await Book.findById(req.params.id).populate('author');
        //return res.send(`${bookById.title} has been found` + bookById);
        res.render('../views/books/show.ejs', {bookById})
        
    } catch (error) {
        console.error(`${chalk.red('Error occurred in listing book by id ', error.message)}`)


const updateBook = async (req, res) => {
    try {
         const updateBookById = await Book.findByIdAndUpdate(req.params.id, req.body, {new:true});
         if(!updateBookById){
            return res.send(`the Book with the id ${req.params.id} not found`);
         };
         return res.send(`Book ${updateBookById.title} has been updated` + updateBookById);
    } catch (error) {
         console.error(`${chalk.red('Error occurred in updating book ', error.message)}`);
    };
};


const createNewBook = async (req, res) => {
    try {
        const bookInDatabase = await Book.findOne({isbn: req.body.isbn})
        const authorInDatabase = await Author.findOne({name: req.body.authorName});
        if (!bookInDatabase){
        if (authorInDatabase) {
            const book = await Book.create(req.body);
            authorInDatabase.works.push(book._id);
            book.save();
            authorInDatabase.save();
            return res.send(`Book ${book.title} has been created`)
        } else {
            const author = await Author.create(
                {
                    name: req.body.authorName,
                    biography: req.body.authorBiography,
                    works: []
      });

            const book = new Book({
            isbn: req.body.isbn,
            title: req.body.title,
            description: req.body.description,
            unitPrice: req.body.unitPrice,
            stock: req.body.stock,
            category: req.body.category,
            publisher: req.body.publisher,
            author: author._id
            });

            const book11 = await Book.create(book);
            console.log(book.author)
            await book.save();
            author.works.push(book._id);
            book.save();
            author.save();
           return res.send(`Book ${book.title} and Author ${author.name} have been created` + {author} + {book}) 
        }
    } catch (error) {
        console.error(`${chalk.red('Error occurred in creating book ', error.message)}`)
    }
}


const deleteBook = async (req, res) => {
    try {
        const deleteBookById = await Book.findByIdAndDelete(req.params.id);
        if(!deleteBookById){
            return res.send(`the Book with the id ${req.params.id} not found`);
        }
        res.send (`${deleteBookById.title} has been deleted successfully` + deleteBookById)
    } catch (error) {
             console.error(`${chalk.red('Error occurred in deleting book ', error.message)}`)
    }   
}

module.exports = {
    listAllBooks,
    listBookById,
    updateBook,
    deleteBook,
    createNewBook
}