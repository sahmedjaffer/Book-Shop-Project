const bcrypt = require('bcrypt');
const chalk = require('chalk');
const User = require('../models/Book.js');

const listAllUsers = async (req, res) => {
    try {
        const listUsers = await User.find();
        return res.send(listUsers);
    } catch (error) {
        console.error(`${chalk.red('Error occurred in listing users!.', error.message)}`);
    }   
}

const listUserById = async (req, res) => {
    try {
        const findUserById = await User.findById(req.params.id);
        return res.send(findUserById)
    } catch (error) {
        
    }
    
}

const updateUser = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
    
}

const deleteUser = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
    
}






module.exports = {
    listAllUsers,
    listUserById,
    updateUser,
    deleteUser,
}