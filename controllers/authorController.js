const bcrypt = require('bcrypt');
const chalk = require('chalk');
const Book = require('../models/Book.js');
const Author = require('../models/Author.js');
const User = require('../models/User.js');

const listAllAuthors = async (req, res) => {
    try {
        const allAuthors = await Author.find();
        if(!listAllAuthors) {
            return res.send('No Authors has been found')
        }

        res.send({allAuthors})

        
    } catch (error) {
        console.error(`${chalk.red('Error occurred in listing Authors!', error.message)}`)
        
    }
    
}

const listAuthorById = async (req, res) => {
    try {
         const findAuthor = await Author.findById(req.params.id)

         if (! findAuthor) {
            return res.send(`No Authors with that id ${findAuthor} has been found`);
         };

         res.send(findAuthor)


        
    } catch (error) {
         console.error(`${chalk.red('Error occurred in listing Author by id ', error.message)}`)
        
    }
    
}

const updateAuthor = async (req, res) => {
    try {
        const updateAuthorById = await Author.findByIdAndUpdate(req.params.id, req.body, {new:true})
        await updateAuthorById.save();
        res.send(`Author with the id ${req.params.id} has been updated successfully`)
        
    } catch (error) {
        console.error(`${chalk.red('Error occurred in updating author by id ', error.message)}`)        
    }
    
}

const deleteAuthor = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
    
}


module.exports = {
    listAllAuthors,
    listAuthorById,
    updateAuthor,
    deleteAuthor}