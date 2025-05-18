const chalk = require('chalk');
const Order = require('../models/Order.js');
const User = require('../models/User.js');
const Book = require('../models/Book.js')

const listAllOrders = async (req, res) => {
    try {
        const showAllOrders = await Order.find();
        if(!showAllOrders){
            return res.send('No orders found!')
        }
        return res.send({showAllOrders});
    } catch (error) {
        console.error(`${chalk.red('Error occurred in listing all orders ', error.message)}`); 
    }
};

const listOrderById = async (req, res) => {
    try {
        const orderById = await Order.findById(req.params.id);
        if(!orderById){
            return res.send(`${orderById.id} order not found`);
        }
        return res.send(`${orderById.id} order has been found` + orderById);        
    } catch (error) {
        console.error(`${chalk.red('Error occurred in listing order by ID ', error.message)}`); 
    }
}

const updateOrder = async (req, res) => {
    try {
        const updateOrderById = await Order.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!updateOrderById){
            return res.send(`${req.params.id} order not found`);
        }        
        return res.send(`Order ${updateOrderById.title} has been updated` + updateOrderById)
    } catch (error) {
        console.error(`${chalk.red('Error occurred in Updating order!.', error.message)}`); 
    }   
}

const createNewOrder = async (req, res) => {
    try {
        req.session.user = {
            _id: '6824d80ef8c6ee221028e903',
        }
         const user = await User.findById(req.session.user._id)
         if (!req.body.deliveryAddress){
            const books = await Book.findById(id) 
            const newOrder = await Order.create({... req.body, deliveryAddress: user.address});
            user.order.push(newOrder._id);
            await user.save();
        return res.send(`Dear ${user.first + user.last} your order placed successfully!`)
        }

        const newOrder = await Order.create(req.body);
        user.order.push(newOrder._id);
        await user.save();
        return res.send(`Dear ${user.first + user.last} your order placed successfully!`)
    } catch (error) {
        console.error(`${chalk.red('Error occurred in creating order!.', error.message)}`); 
    }
}

const deleteOrder = async (req, res) => {
    try {
        const deleteOrderById = await Order.findByIdAndDelete(req.body.id);
        if(!deleteOrderById){
            return res.send(`Order ${deleteOrderById} not found!`);
        }
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