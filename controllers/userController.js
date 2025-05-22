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
        res.render('./users/allUsers.ejs', { usersData });
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
      order: findUserById.order
    };

    res.render('./users/profile.ejs', { userData });
  } catch (error) {
    console.error(chalk.red('Error occurred in listing user by ID!'), error.message);
    res.status(500).send('Internal Server Error');
  }
};

const updateUser = async (req, res) => {
    try {
        const { _id } = req.body ;
        const { first , last , email , address , phone } = req.body ;
      // find user by id
         const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
         if (!user) {
         if(first) user.first = first ;
         if(last) user.last = last ;
         if(email) user.email= email ; 
         if(address) user.address = address;
         if(phone) user.phone = phone ; 
         return res.status(404).json ({ message: "User not found !"});  
         }
         // Save the updated user
         const updatedUser = await user.save();
             res.status(200).json({
                 _id: updatedUser._id,
                 first: updatedUser.first,
                 last: updatedUser.last,
                 email: updatedUser.email,
                 address: updatedUser.address,
                 phone: updatedUser.phone
             });
     } catch (error) {
         console.log(error);
         res.status(500).json({
             message: error.message
         });
     };
    }
 
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
module.exports = {
    listAllUsers,
    listUserById,
    updateUser,
    deleteUser ,
}