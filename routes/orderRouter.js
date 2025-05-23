const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js')
const Book = require('../models/Book.js')
const Order = require('../models/Order.js');
const { trusted } = require('mongoose');



router.get('/', orderController.listAllOrders);
router.post('/addToCart/:id', async (req, res)=> {
  // Assuming you're inside a route like:
// router.post('/cart/add/:id', async (req, res) => { ... })

try {
  const itemId = req.params.id;
  // Find the book from the database
  const findBookInfo = await Book.findById(itemId).populate('order');
  if (!findBookInfo) {
    return res.send('Sorry, this book is unavailable');
  }
  // Initialize cart if it doesn't exist
  if (!req.session.cart) {
    req.session.cart = [];
  }
  let bookCart = req.session.cart;
  // Check if the book is already in the cart
  const existingBook = bookCart.find(item => item.id === itemId);
  if (existingBook) {
    existingBook.qty += 1;
  } else {

    bookCart.push({
      id: itemId,
      title: findBookInfo.title,
      unitPrice: findBookInfo.unitPrice, 
      qty: 1
    });
  }
  // Save the updated cart
  req.session.cart = bookCart;
  console.log('Cart contents:', bookCart);
  res.render('../views/orders/newOrder.ejs', {bookCart});

 // return res.json(bookCart); // or redirect or render a view
} catch (error) {
  console.error('Error in pushing item to cart:', error.message);
  return res.send('Internal Server Error');
}})

router.get('/cart', (req, res) => {
  const bookCart = req.session.cart || [];
  res.render('orders/newOrder', { bookCart });
});

router.post('/deleteFromCart/:id', (req, res) => {
  const bookId = req.params.id;

  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(book => book.id !== bookId);
  }

  res.redirect('/cart');
});

router.post('/clearCart', (req, res) => {
  req.session.cart = [];
  res.redirect('/cart'); 
});


router.post('/', orderController.createNewOrder);
router.get('/:id', orderController.listOrderById);
router.put('/:id',orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);





module.exports = router;