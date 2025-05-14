const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js')


router.get('/', orderController.listAllOrders);
router.get('/:id', orderController.listOrderById);
router.post('/', orderController.createNewOrder);
router.put('/:id',orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;