const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js')
const Book = require('../models/Book.js')
const Order = require('../models/Order.js');
const { trusted } = require('mongoose');



router.get('/', orderController.listAllOrders);
router.post('/addToCart/:id', orderController.addToCartItems);

router.get('/cart', orderController.showCart);

router.post('/deleteFromCart/:id', orderController.deleteFromCart);

router.post('/clearCart', orderController.clearCart);


router.post('/', orderController.createNewOrder);
router.get('/:id', orderController.listOrderById);
router.put('/:id',orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);





module.exports = router;