const chalk = require('chalk');
const Order = require('../models/Order.js');
const User = require('../models/User.js');
const Book = require('../models/Book.js')

const listAllOrders = async (req, res) => {
    try {
            if (!req.session || !req.session.user) {
                res.redirect('/sign-in')
            }


        const showAllOrders = await Order.find({ user: req.session.user._id })
        .populate('user')
        .populate({
            path: 'cart',
            populate: { path: 'author', select: 'name' }
        });        
        if(!showAllOrders){
            return res.send('No orders found!')
        }
        res.render('orders/allOrders', { orders: showAllOrders, user: req.session.user });
    } catch (error) {
        console.error(`${chalk.red('Error occurred in listing all orders ', error.message)}`); 
    }
};

const listOrderById = async (req, res) => {
    try {
        //to show the author name in the order by access to the referenced schema which is author schema in this case
        const orderById = await Order.findById(req.params.id)
            .populate('user')
            .populate({
                path: 'cart',
                populate: { path: 'author', select: 'name' } 
      
            });
        if(!orderById){
            return res.send(`${orderById.id} order not found`);
        }
        res.render('./orders/showOrder.ejs', { order: orderById });
        //return res.send(`${orderById.id} order has been found` + orderById);        
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
    if (!req.session.user || !req.session.user._id) {
      //return res.status(401).send('User not logged in');
      res.redirect('/sign-in')
    }

    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const cart = req.session.cart;
    if (!cart || cart.length === 0) {
      return res.status(400).send('Your cart is empty.');
    }

    // Extract book IDs from session cart
    const bookIds = cart.map(item => item.id);

    // Calculate total price (if unitPrice exists in session)
    const totalPrice = cart.reduce((sum, item) => sum + (item.qty * item.unitPrice), 0);

    const deliveryAddress = req.body.deliveryAddress || user.address;

    const newOrder = await Order.create({
      user: user._id,
      cart: bookIds, // just the array of book ObjectIds
      deliveryAddress,
      totalPrice: totalPrice,
      orderDate: new Date().toString()
    });

    

    // Save the order to the user
    user.order.push(newOrder._id);
    await user.save();

const populatedOrder = await Order.findById(newOrder._id).populate('cart').populate('user');

req.session.cart = []; // clear cart
res.render('orders/showOrder', { user, order: populatedOrder });
    //return res.send(`Dear ${user.first + user.last}, your order was placed successfully!`);
  } catch (error) {
    console.error('Error occurred in creating order!', error.message);
    res.status(500).send('Something went wrong while placing the order.');
  }
};


const deleteOrder = async (req, res) => {
    try {
        const deleteOrderById = await Order.findByIdAndDelete(req.body.id);
        if(!deleteOrderById){
            return res.send(`Order ${deleteOrderById} not found!`);
        }
       // return res.send(`Order ${deleteOrderById} has been deleted!`)
        
       res.render('/views/orders/confirmOrderDeletion.ejs', {deleteBookById});


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