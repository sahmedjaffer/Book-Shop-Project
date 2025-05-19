const express = require('express');
const chalk = require('chalk');
const logger = require('morgan');
require('dotenv').config();
const methodOverride = require('method-override');
const session = require('express-session');
const PORT = process.env.PORT ? (process.env.PORT) : 3005;
const db = require('./db');
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});



// app.get('/', (req, res) => {
//   res.render('index');
// });


const indexRouter = require('./routes/indexRouter.js');
const authRouter = require('./routes/authRouter.js');
const userRouter = require('./routes/userRouter.js');
const authorRouter = require('./routes/authorRouter.js');
const bookRouter = require('./routes/bookRouter.js');
const orderRouter = require('./routes/orderRouter.js');

app.use('/', indexRouter);
app.use("/", authRouter);
app.use('/users',userRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);
app.use('/orders', orderRouter);


app.listen(PORT, ()=>{
    console.log (`listening on port ${chalk.green(PORT)}`);
})