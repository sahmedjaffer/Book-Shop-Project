const bcrypt = require('bcrypt');
const chalk = require('chalk');
const Order = require('../models/Order.js');
const User = require('../models/User.js');
const Book = require('../models/Book.js')

const listAllOrders = async (req, res) => {
    try {
        const showAllOrders = await Order.find();
        return res.send({showAllOrders});
        
    } catch (error) {
        console.error(`${chalk.red('Error occurred in listing all orders ', error.message)}`); 
    }
    
};

const listOrderById = async (req, res) => {
    try {
        const orderById = await Order.findById(req.params.id);
        return res.send(`${orderById.title} has been found` + orderById);
        
    } catch (error) {
        console.error(`${chalk.red('Error occurred in listing order by ID ', error.message)}`); 
    }
    
}

const updateOrder = async (req, res) => {
    try {
        const updateOrderById = await Order.findByIdAndUpdate(req.params.id, req.body, {new:true});
        return res.send(`Order ${updateOrderById.title} has been updated` + updateOrderById)
    } catch (error) {
        console.error(`${chalk.red('Error occurred in Updating order!.', error.message)}`); 

    }
    
}

const createNewOrder = async (req, res) => {
    try {
        const user = await User.findOne(_id);
        const addressInDatabase = user.address;

        if (addressInDatabase !== req.body.deliveryAddress) {
            
        }



        const newOrder = await Order.create(req.body);
        user.order.push(newOrder._id);
        user.save();
        return res.this.send(`Dear ${user.first + user.last} your order placed successfully!`)



    } catch (error) {
        console.error(`${chalk.red('Error occurred in creating order!.', error.message)}`); 


    }
    
}

const deleteOrder = async (req, res) => {
    try {
        const deleteOrderById = await Order.findByIdAndDelete(req.body.id);
        return res.send(`Order ${deleteOrderById} has been deleted!`)
    } catch (error) {
        console.error(`${chalk.red('Error occurred in deleting order!.', error.message)}`); 
    }
    
}






module.exports = {
    listAllOrders,
    listOrderById,
    updateOrder,
    deleteOrder,
    createNewOrder
}