const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js')
const authController = require('../controllers/authController.js')


router.get('/', userController.listAllUsers);

router.get('/:id', userController.listUserById);
router.put('/:id',userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/:id/edit', userController.updateUserPage)


module.exports = router;