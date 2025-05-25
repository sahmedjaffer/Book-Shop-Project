const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js')
const Order = require('../models/Order.js');



router.get('/', orderController.listAllOrders);

router.post('/', orderController.createNewOrder);

router.post('/newOrder/:id', orderController.addToCartItems);

router.get('/cart', orderController.showCart);

router.post('/clearCart', orderController.clearCart);

router.get('/deleteFromCart/:id', orderController.deleteFromCart);

router.get('/confirm', orderController.showConfirmPage);      
router.get('/:id/confirm', orderController.showConfirmPage);  
router.post('/:id/confirm', orderController.confirmOrder);    

router.get('/:id', orderController.listOrderById);

router.put('/:id', orderController.updateOrder);

router.delete('/:id', orderController.deleteOrder);





module.exports = router;