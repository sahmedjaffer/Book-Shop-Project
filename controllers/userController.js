const bcrypt = require('bcrypt');
const chalk = require('chalk');
const User = require('../models/User.js');

const listAllUsers = async (req, res) => {
    try {
        const listUsers = await User.find().populate('order');
        if (!listUsers){
        return res.send(`Sorry No Users was Found`);
        }
        //return res.send({listUsers});
        res.render('./users/allUsers.ejs', { listUsers });
    } catch (error) {
        console.error(`${chalk.red('Error occurred in listing users!.', error.message)}`);
    }   
}

const listUserById = async (req, res) => {
  try {
    const findUserById = await User.findById(req.params.id).populate('order');

    if (!findUserById) {
      return res.send(`Sorry, user with id ${req.params.id} not found.`);
    }

    const userData = {
      first: findUserById.first,
      last: findUserById.last,
      email: findUserById.email,
      address: findUserById.address,
      phone: findUserById.phone,
      role: findUserById.role,
      order: findUserById.order,
      _id: findUserById._id
    };

    if (userData.role === 'admin') {
      return res.render('admins/adminProfile', { userData });
    }
    if (userData.role === 'user' ) {
      return res.render('users/userProfile', { userData });
    }
    // If the user is neither admin nor user, render a generic profile page

  } catch (error) {
    console.error(chalk.red('Error occurred in listing user by ID!'), error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    // find user by id and update
    const updateUserById = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updateUserById) {
      return res.render('auth/userNotFound');
    }

    // Update session user if this is the logged-in user
    if (req.session.user._id == updateUserById._id) {
      req.session.user = updateUserById;
    }

    if (updateUserById.role === 'admin')
      return res.redirect('/admins/profile');
    else if (updateUserById.role === 'user')
      return res.redirect('/users/profile');
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};
 
 // Delete User 
 const deleteUser = async (req, res) => {
     try {
         const userID = req.params.id;
         // Find the user by ID and delete it
         const user = await User.findByIdAndDelete(userID);
          
         if (!user) {
            return res.send(`User with id ${userID} not found!`);
         }
            return res.status(200).json({
            message: "User deleted successfully."
             });
        } catch (error) {
         console.log(error);
         res.status(404).json({
             message: "User not found!",
             error: error.message
         })
     }
     
 };

 const updateUserPage = async (req, res) => {
   try {
       const user = await User.findById(req.params.id)
       res.render('auth/updateUser', {user});
     
   } catch (error) {
 
     res.send('Error loading form', error.message);
 
   }
 
 }



module.exports = {
    listAllUsers,
    listUserById,
    updateUser,
    deleteUser ,
    updateUserPage,

}