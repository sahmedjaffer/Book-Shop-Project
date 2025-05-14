const bcrypt = require('bcrypt');
const chalk = require('chalk');
const User = require('../models/User.js');
// create a new user and the role if not exist
const registerUser = async (req, res) => {
    try {
        // check if the user exist
        const userInDatabase = await User.findOne({email: req.body.email});
        if(userInDatabase){
            return res.send(`${userInDatabase.email} is already exist!`);
        };
        // check if the password and confirm password are matched
        if (req.body.password !== req.body.confirmPassword){
            return res.send('Password and confirm password must match!');
        };

        // hashed the password
        const hashedPassword = bcrypt.hashSync(req.body.password, 12);

        // create the user
        const user = await User.create(
        {
            first: req.body.first,
            last: req.body.last,
            email: req.body.email,
            password: hashedPassword,
            address: req.body.address,
            phone: req.body.phone,
            role: req.body.role,
            order: []
        })
        res.send(`${chalk.green(`Congrats the user with email ${user.email} created successfully!`)}`)
    } catch (error) {
        console.error(`${chalk.red('An error occurred registering a user!')} `+`${chalk.red(error.message)}`)
    }  
}

const signInUser = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user){
            return res.send(`No user has been found with this email ${req.body.email}. Please sign up`);
        }

        const validPassword = bcrypt.compareSync(req.body.password, user.password)

        if(!validPassword){
            return res.send('Incorrect password, Please try again!')
        }
        req.session.user = {
            email: user.email,
            _id: user._id,
            first: user.first
        }
        if(user.role === 'Admin'){
                    res.send(`Dear ${first} Welcome to our bookshop as a ${user.role}`)
        } else {
                    res.send(`Dear ${first} Welcome to our bookshop`)

        }
    } catch (error) {
        console.error(`${chalk.red('An error has occurred signing in a user!')}` + `${chalk.red(error.message)}`)
    }
    
}

const signOutUser = (req, res) =>{
    try {
        req.session.destroy()
        res.send('See you next time!!!')
    } catch (error) {
                console.error(`${chalk.red('An error has occurred signing out a user!')}` + `${chalk.red(error.message)}`)                
    }
}

const updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) {
            return res.send('No user with ID exists');
        }
        const validPassword = bcrypt.compareSync(
            req.body.oldPassword,
            user.password
        )
        if(!validPassword){
            return res.send('Your old password was not correct!. Please try again.')
        }
        if (req.body.newUpdatePassword !== req.body.confirmUpdatePassword){
            return res.send('Password and Confirm Password must match');
        };
        const hashedUpdatePassword = bcrypt.hashSync(req.body.newUpdatePassword, 12);
        user.password=hashedUpdatePassword;
        await user.save();
        res.send('Your password hab been updated successfully');
    } catch (error) {
             console.error(`${chalk.red('An error has occurred updating a user!')}` + `${chalk.red(error.message)}`)                

    }
    
}

// export the modules
module.exports = {
    registerUser,
    signInUser,
    signOutUser,
    updatePassword
}