const chalk = require('chalk');
const Book = require('../models/Book.js');
const Author = require('../models/Author.js');
const User = require('../models/User.js');




const createNewBook = async (req, res) => {

  try {
    
    //save the request body in variables
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

    const isBookExist = await Book.findOne({ isbn });

    if (isBookExist) {
      return res.redirect(`/books/${isBookExist._id}`);
    }

    //create author to save request body author ID to avoid undefined  
    let author;

    //to check if the author exist
    if (authorId) {
      // validate user existing
      author = await Author.findById(authorId);
    }

       if (!author) {
      if (!newAuthorName || !newAuthorBiography) {
        return res.status(400).send('Author information is missing.');
      }

      // Create new author
      author = await Author.create({
        name: newAuthorName,
        biography: newAuthorBiography,
        works: []
      });


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
  }} catch (error) {
    console.error(`Error occurred in creating book: ${error.message}`);
    return res.status(500).send('Internal Server Error');
  }
};


// const listAllBooks = async (req, res) => {
//     try {
          
//       const findAllBooks = await Book.find().populate('author');
      
//       if(!findAllBooks){
      
//         res.render('books/bookNotFound');
      
//       }else{
    
//         let userRole = null;
    
//         if (req.session.user && req.session.user._id) {
    
//           userRole = await User.findById(req.session.user._id);
    
//         }
//         const author = findAllBooks.find(book => book.author && book.author.name);
        
//         console.log(chalk.blue('Author name: ', author.name));

    

//         console.log();
//        // if(!author){

//         res.render('books/allBooks', { findAllBooks, userRole });  
    
//       }
//     }
    
//     catch (error) {
    
//       console.error(`${chalk.red('Error occurred in listing all book ', error.message)}`)
    
//     } 
//   }





const listBookById = async (req, res) => {
  try {
    const id = req.params.id;
    const findBookById = await Book.findById(id).populate('author');
    const booksCart = [];

    if (!findBookById) {
      return res.render('books/bookNotFound', { findBookById: null });
    }

    let userRole = null;
    if (req.session.user && req.session.user.role) {
      userRole = req.session.user.role
    }else {
      userRole='Guest'
    }

    console.log(userRole)
    return res.render('books/showBook', { findBookById, booksCart, userRole });

  } catch (error) {
    console.error(`Error occurred in listing book by id: ${error.message}`);
    return res.send('Internal Server Error');
  }
};

    
const updateBook = async (req, res) => {
    try {
         const updateBookById = await Book.findByIdAndUpdate(req.params.id, req.body, {new:true});
         if(!updateBookById){
            return res.render('books/bookNotFound');
         };
         return res.redirect(`/books/${updateBookById._id}`)
    } catch (error) {
         console.error(`${chalk.red('Error occurred in updating book ', error.message)}`);
    };
};


const deleteBook = async (req, res) => {
    try {
        const deleteBookById = await Book.findByIdAndDelete(req.params.id);
       await Author.updateOne( { _id: deleteBookById.author._id }, { $pull: { works: deleteBookById._id } });

        if(!deleteBookById){
            res.render(`books/bookNotFound`);
        }else {
       res.render('/books/confirm', {deleteBookById});
        }
    } catch (error) {
             console.error(`${chalk.red('Error occurred in deleting book ', error.message)}`)
    }   
}


const editBookPage = async (req, res) => {
  try {
      const book = await Book.findById(req.params.id).populate('author')
      const authors = await Author.find().populate('works');
      res.render('books/editBook', ({ book , authors}))
    
  } catch (error) {

    res.send('Error loading form', error.message);

  }

}


const newBookPage = async (req, res) => {
    try {
    const authors = await Author.find();
      res.render('books/newBook', { authors });
  } catch (error) {
    res.send('Error loading form', error.message);
  }
}




const searchBooks = async (req, res) => {
    try {
            const filter = req.query.all || 'all';
      const findByTitle = req.query.title || '';
      const findByCategory = req.query.category || '';
      const findByPublisher = req.query.publisher || '';
      const findByIsbn = req.query.isbn || '';
      const findByAuthor = req.query.author || ''; 
              let userRole = null;
    
        if (req.session.user && req.session.user._id) {
    
          userRole = await User.findById(req.session.user._id);
        }

      const showAllBooks = await Book.find({}).populate('author');
      res.render('books/allBooks', { showAllBooks,userRole });






      // Check if user is authenticated

            // Check if user has a valid role


        
            // Check if user has a valid search term
           
            if (!filter || filter === 'all') {
              // If filter is 'all', return all books
              const showAllBooks = await Book.find({}).populate('author');
              return res.render('books/allBooks', { showAllBooks,userRole });
            }
            if (filter === 'author' && findByAuthor) {
              // If filter is 'author', return books by author
              const showAllBooks = await Book.find({ author: findByAuthor }).populate('author');
              return res.render('books/allBooks', { showAllBooks,userRole });
            }
            if (filter === 'title' && findByTitle) {
              // If filter is 'title', return books by title
              const showAllBooks = await Book.find({ title: findByTitle }).populate('author');
              return res.render('books/allBooks', { showAllBooks,userRole });
            }
            if (filter === 'category' && findByCategory) {
              // If filter is 'category', return books by category
              const showAllBooks = await Book.find({ category: findByCategory }).populate('author');
              return res.render('books/allBooks', { showAllBooks,userRole });
            }
            if (filter === 'publisher' && findByPublisher) {
              // If filter is 'publisher', return books by publisher
              const showAllBooks = await Book.find({ publisher: findByPublisher }).populate('author');
              return res.render('books/allBooks', { showAllBooks,userRole });
            }
            if (filter === 'isbn' && findByIsbn) {
              // If filter is 'isbn', return books by isbn
              const showAllBooks = await Book.find({ isbn: findByIsbn }).populate('author');
              return res.render('books/allBooks', { showAllBooks,userRole });
            }
            // If filter is not valid, return an error message
            if (!['all', 'author', 'title', 'category', 'publisher', 'isbn'].includes(filter)) {
              return res.render('books/bookNotFound');
            }
            // If filter is 'all', return all books

        
          
          }catch (error) {
        console.error(`${chalk.red('Error occurred in searching books ', error.message)}`);
        return res.status(500).send('Internal Server Error');
    };     
}


    module.exports = {
    //listAllBooks,
    listBookById,
    updateBook,
    deleteBook,
    createNewBook,
    editBookPage,
    newBookPage,
    searchBooks
}