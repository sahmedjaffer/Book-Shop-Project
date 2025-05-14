const bcrypt = require('bcrypt');
const chalk = require('chalk');
const Book = require('../models/Book.js');
const Author = require('../models/Author.js');
const Order = require('../models/Order.js');

const listAllBooks = async (req, res) => {
    try {
        const allBooks = await Book.find();
       return res.send({allBooks});

    } catch (error) {
                console.error(`${chalk.red('Error occurred in listing all book ', error.message)}`)

    }
    
}

const listBookById = async (req, res) => {
    try {
        const bookById = await Book.findById(req.params.id)
        return res.send(`${bookById.title} has been found` + bookById)
        
    } catch (error) {
        console.error(`${chalk.red('Error occurred in listing book by id ', error.message)}`)

    }
    
}

const updateBook = async (req, res) => {
    try {
         const updateBookById = await Book.findByIdAndUpdate(req.params.id, req.body, {new:true});
         return res.send(`Book ${updateBookById.title} has been updated` + updateBookById)
    } catch (error) {
                console.error(`${chalk.red('Error occurred in updating book ', error.message)}`)

    }
    
}

const createNewBook = async (req, res) => {
    try {
        const authorInDatabase = await Author.findOne({name: req.body.authorName});
        if (authorInDatabase) {
 
            const book = await Book.create(req.body);
            authorInDatabase.works.push(book._id);
            authorInDatabase.save();
            return res.send(`Book ${book.title} has been created`)
        } else {
            
            const author = await Author.create(
                {
                    name: req.body.authorName,
                    biography: req.body.authorBiography,
                    works:[]
                }
            );
            const book = await Book.create(req.body);
            author.works.push(book._id);
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