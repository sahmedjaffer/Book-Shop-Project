const chalk = require('chalk');
const Author = require('../models/Author.js');

const listAllAuthors = async (req, res) => {
    try {
        const allAuthors = await Author.find({});
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
         const findAuthor = await Author.findById(req.params.id).populate('works')
         if(!findAuthor) {
            return res.send(`No Authors with that id ${findAuthor} has been found`);
         };
         return res.send(findAuthor)
    } catch (error) {
         console.error(`${chalk.red('Error occurred in listing Author by id ', error.message)}`)
    }
}

const updateAuthor = async (req, res) => {
    try {
        const updateAuthorById = await Author.findByIdAndUpdate(req.params.id, req.body, {new:true})
        if(!updateAuthorById) {
            return res.send(`No Authors with that id ${updateAuthorById} has been found`);
        }
        await updateAuthorById.save();
        return res.send(`Author with the id ${req.params.id} has been updated successfully`)   
    } catch (error) {
        console.error(`${chalk.red('Error occurred in updating author by id ', error.message)}`)        
    }
    
}

const deleteAuthor = async (req, res) => {
     try {
            const deleteAuthorById = await Author.findByIdAndDelete(req.params.id);
            if(!deleteAuthorById){
                return res.send(`Author with id ${req.params.id} does not exist!`)
            }
            return res.status(200).json({
                     message: `Author ${deleteAuthorById} deleted successfully.`
                 });        
         } catch (error) {
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