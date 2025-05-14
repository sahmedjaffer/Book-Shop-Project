const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js')


router.get('/', userController.listAllUsers);
router.get('/:id', userController.listUserById);
router.put('/:id',userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;