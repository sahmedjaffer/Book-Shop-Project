const chalk = require('chalk');
const Order = require('../models/Order.js');
const User = require('../models/User.js');
const Book = require('../models/Book.js')


const createNewOrder = async (req, res) => {
  try {

   const sessionUserId= req.session.user._id

    if (!sessionUserId) {
      
      return res.redirect('/sign-in');

    }

    const user = await User.findById(sessionUserId);

    if (!user) {
      
        return res.render('auth/userNotFound')
        
    }

    const cart = req.session.cart;
    if (!cart || cart.length === 0) {
      return res.render('cart/emptyCart')
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
//res.redirect(`/orders/${populatedOrder._id}`)

return res.render('orders/showOrder', { user, orderById: populatedOrder });
    //return res.send(`Dear ${user.first + user.last}, your order was placed successfully!`);
  } catch (error) {
    console.error('Error occurred in creating order!', error.message);
  }
};


const listAllOrders = async (req, res) => {
    try {
        const sessionUser = req.session.user
            if (!sessionUser) {
                return res.redirect('/sign-in')
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
        return res.render('orders/allOrders', { orders: showAllOrders, user: sessionUser});
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
            return res.send(` order not found`);
        }
        return res.render('./orders/showOrder.ejs', { orderById });
        //return res.send(`${orderById.id} order has been found` + orderById);        
    } catch (error) {
        console.error(`${chalk.red('Error occurred in listing order by ID ', error.message)}`); 
    }
}

const updateOrder = async (req, res) => {
    try {
        const updateOrderById = await Order.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!updateOrderById){
            return res.send(` order not found`);
        }        
        return res.render('orders/editOrder', updateOrderById)
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
        
       return res.render('orders/confirmOrderDeletion', {deleteOrderById});


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
//res.redirect(`/orders/}`)
  return res.render('orders/newOrder', {bookCart});

 // return res.json(bookCart); // or redirect or render a view
} catch (error) {
  console.error('Error in pushing item to cart:', error.message);
  return res.send('Internal Server Error');
}}


const showCart = (req, res) => {
  const bookCart = req.session.cart || [];
  return res.render('orders/newOrder', { bookCart });
}


const deleteFromCart = (req, res) => {
  const bookId = req.params.id;

  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(book => book.id !== bookId);
  }

  return res.redirect('/cart');
}

const clearCart = (req, res) => {
  req.session.cart = [];
 return res.redirect('/cart'); 
}


const showConfirmPage = async (req, res) => {
  try {
    let orders;

    if (req.params.id) {
      orders = await Order.findById(req.params.id)
        .populate('user')
        .populate('cart');

      if (!orders) {
        return res.render('admins/noOrderToConfirmedFound');
      }

      return res.render('admins/confirmOrders', { orders: [orders] }); // تحويل إلى array
    } else {
      orders = await Order.find({ status: 'pending' })
        .populate('user')
        .populate('cart');

      if (!orders || orders.length === 0) {
        return res.render('admins/noOrderToConfirmedFound');
      }

      return res.render('admins/confirmOrders', { orders });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};


const confirmOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: 'confirmed' },
      { new: true }
    );
    if (!order) return res.status(404).send('Order not found');
return res.redirect('/orders/confirm');
  } catch (err) {
    res.status(500).send(err.message);
  }
};


module.exports = {
    listAllOrders,
    listOrderById,
    updateOrder,
    deleteOrder,
    createNewOrder,
    addToCartItems,
    showCart,
    deleteFromCart,
    clearCart,
    confirmOrder,
    showConfirmPage
}