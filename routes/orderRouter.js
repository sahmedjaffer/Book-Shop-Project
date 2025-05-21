const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js')
const Book = require('../models/Book.js')
const Order = require('../models/Order.js')



router.get('/', orderController.listAllOrders);
router.post('/addToCart/:id', async (req, res)=> {
    try {
    const itemId= req.params.id;
    // find the book info from the database
    const findBookInfo = await Book.findOne({_id: itemId});
  
    if (!findBookInfo) {
       return res.send('Sorry this boos is unavailable')
    }
    // Initialize cart if it doesn't exist
      if (!req.session.cart) {
      req.session.cart = [];
    }

     
    //push the books to the cart
    req.session.cart.push(findBookInfo._id)
          //  res.render('/views/orders/showOrder.ejs')
          let booksCart = req.session.cart;
          console.log(booksCart)
         return res.json(booksCart) 
    } catch (error) {
        console.error('Error in push items to booksCart', error.message);
         return res.status(500).send('Internal Server Error');
    }
} )
router.post('/', orderController.createNewOrder);
router.get('/:id', orderController.listOrderById);
router.put('/:id',orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);





module.exports = router;