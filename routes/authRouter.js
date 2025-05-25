const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js')

router.post('/sign-up', authController.registerUser);
router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up')
});
router.post('/sign-in', authController.signInUser);
router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in', {
    error: null,
    email: ''
  });
});
router.get('/admins/profile', authController.adminProfile);
router.get('/users/profile', authController.userProfile);
router.get('/sign-out', authController.signOutUser);
router.put('/:id', authController.updatePassword);
router.get('/:id/update-password', (req, res) => {
  res.render('auth/update-password')
})
module.exports = router;