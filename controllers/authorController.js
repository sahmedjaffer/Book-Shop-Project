const chalk = require('chalk');
const Author = require('../models/Author.js');
const Book = require('../models/Book.js')

const listAllAuthors = async (req, res) => {
    try {
        const allAuthors = await Author.find().populate('works');
        if(!listAllAuthors) {
        return res.redirect('/authors/new')
        }
       return res.render('../views/authors/allAuthors.ejs', {allAuthors});

    } catch (error) {
        console.error(`${chalk.red('Error occurred in listing Authors!', error.message)}`)
    }
}

const listAuthorById = async (req, res) => {
    try {

        const id = req.params.id
        
        const findAuthor = await Author.findById(id).populate('works');

   let userRole = null;
    if (req.session.user && req.session.user.role) {
      userRole = req.session.user.role
    }else {
      userRole='Guest'
    }        
        if(!findAuthor) {
        
            return res.render('authors/authorNotFound');
        
        };
        
        return res.render('authors/showAuthor',{findAuthor,userRole})

    } catch (error) {
         console.error(`${chalk.red('Error occurred in listing Author by id ', error.message)}`)
    }
}



const updateAuthor = async (req, res) => {

    try {
        const id = req.params.id
        
        const updateAuthorById = await Author.findByIdAndUpdate(id, req.body, {new:true})

        if(!updateAuthorById) {

            return res.render('../views/authors/authorNotFound.ejs')

        }

        await updateAuthorById.save();

        //return res.send(`Author with the id ${req.params.id} has been updated successfully`);   

        return res.redirect(`/authors/${updateAuthorById._id}`)

    } catch (error) {

        console.error(`${chalk.red('Error occurred in updating author by id ', error.message)}`)        

    }
    
}

const editAuthorPage = async (req, res) => {
    
  
    const authors = await Author.findById(req.params.id).populate('works');
  
    res.render('../views/authors/editAuthor.ejs', ({authors}))

}

const deleteAuthor = async (req, res) => {
       try {

        const id = req.params.id;

        const deleteAuthorById = await Author.findByIdAndDelete(id);

        const findAuthorInBook = await Book.findOne({author: {id}})

        if(!deleteAuthorById){

            return res.render('authors/authorNotFound')

        }

        return res.render('authors/confirmDeletionAuthor', {deleteAuthorById});        

    } catch (error) {

        console.log(error);

        res.status(404).json({

            message: "Author not found!",

            error: error.message

        })

    }

}


const newAuthorPage = async (req, res) => {
    try {
      res.render('authors/newAuthor');
  } catch (error) {
    res.send('Error loading form', error.message);
  }
}


module.exports = {
    listAllAuthors,
    listAuthorById,
    updateAuthor,
    deleteAuthor,
    editAuthorPage,
    newAuthorPage
}