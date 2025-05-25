const chalk = require('chalk');
const Order = require('../models/Order.js');
const User = require('../models/User.js');
const Book = require('../models/Book.js')


const createNewOrder = async (req, res) => {
  try {

   const sessionUserId= req.session.user._id



    if (!sessionUserId) {
      
      res.redirect('/sign-in');

    }

    const user = await User.findById(sessionUserId);

    if (!user) {
      
        return res.render('/views/auth/userNotFound.ejs')
        
    }

    const cart = req.session.cart;
    if (!cart || cart.length === 0) {
      return res.render('/views/cart/emptyCart.ejs')
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
  }
};


const listAllOrders = async (req, res) => {
    try {
        const sessionUser = req.session.user
            if (!sessionUser) {
                res.redirect('/sign-in')
            }
        const showAllOrders = await Order.find({ user: sessionUser._id })
        .populate('user')
        .populate({
            path: 'cart',
            populate: { path: 'author', select: 'name' }
        });        
        if(!showAllOrders){
            return res.send('No orders found!')
        }
        res.render('orders/allOrders', { orders: showAllOrders, user: sessionUser});
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


const addToCartItems = async (req, res)=> {

try {
  const itemId = req.params.id;
  // Find the book from the database
  const findBookInfo = await Book.findById(itemId).populate('order');
  if (!findBookInfo) {
    return res.send('Sorry, this book is unavailable');
  }
  // Initialize cart if it doesn't exist
  if (!req.session.cart) {
    req.session.cart = [];
  }
  let bookCart = req.session.cart;
  // Check if the book is already in the cart
  const existingBook = bookCart.find(item => item.id === itemId);
  if (existingBook) {
    existingBook.qty += 1;
  } else {

    bookCart.push({
      id: itemId,
      title: findBookInfo.title,
      unitPrice: findBookInfo.unitPrice, 
      qty: 1
    });
  }
  // Save the updated cart
  req.session.cart = bookCart;
  console.log('Cart contents:', bookCart);
  res.render('../views/orders/newOrder.ejs', {bookCart});

 // return res.json(bookCart); // or redirect or render a view
} catch (error) {
  console.error('Error in pushing item to cart:', error.message);
  return res.send('Internal Server Error');
}}


const showCart = (req, res) => {
  const bookCart = req.session.cart || [];
  res.render('orders/newOrder', { bookCart });
}


const deleteFromCart = (req, res) => {
  const bookId = req.params.id;

  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(book => book.id !== bookId);
  }

  res.redirect('/cart');
}

const clearCart = (req, res) => {
  req.session.cart = [];
  res.redirect('/cart'); 
}

module.exports = {
    listAllOrders,
    listOrderById,
    updateOrder,
    deleteOrder,
    createNewOrder,
    addToCartItems,
    showCart,
    deleteFromCart,
    clearCart
}