const bcrypt = require('bcrypt');
const chalk = require('chalk');
const Book = require('../models/Book.js');
const Author = require('../models/Author.js')

const listAllAuthors = async (req, res) => {
    try {

        const authorInDatabase = await Author.findOne({name: req.body.name});

        if(authorInDatabase){
            return res.send(`${authorInDatabase} is already exist`)
        }
        
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

const createNewAuthor = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
    
}

const deleteAuthor = async (req, res) => {
    try {
        
    } catch (error) {
        
    }updateAuthor
    
}






module.exports = {
    listAllAuthors,
    listAuthorById,
    updateAuthor,
    deleteAuthor,
    createNewAuthor
}