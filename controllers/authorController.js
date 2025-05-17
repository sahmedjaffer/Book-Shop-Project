const bcrypt = require('bcrypt');
const chalk = require('chalk');
const Book = require('../models/Book.js');
const Author = require('../models/Author.js')

const listAllAuthors = async (req, res) => {
    try {

        const allAuthors = await Author.find();
        res.send({allAuthors})

        
    } catch (error) {
        
    }
    
}

const listAuthorById = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
    
}

const updateAuthor = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
    
}

const deleteAuthor = async (req, res) => {
     try {
             const userID = req.params.id;
     
             // Find the Author by ID and delete it
             const author = await Author.findByIdAndDelete(userID);
     
             if (author) {
                 res.status(200).json({
                     message: "Author deleted successfully."
                 });
            
         }} catch (error) {
             console.log(error);
             res.status(404).json({
                 message: "Author not found!",
                 error: error.message
             })
         }
         
}


module.exports = {
    listAllAuthors,
    listAuthorById,
    updateAuthor,
    deleteAuthor}