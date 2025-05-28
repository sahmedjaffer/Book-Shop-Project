const bcrypt = require('bcrypt');
const chalk = require('chalk');
const User = require('../models/User.js');


// create a new user controller
const registerUser = async (req, res) => {
    try {
        // create an object to store all the req.body variables
        const { 
            first,
            last,
            email,
            password,
            confirmPassword,
            address,
            phone,
            role
            } = req.body;

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase();
    
    // Check if user exists with case-insensitive search
    const userExists = await User.findOne({ email: normalizedEmail });
    
        if (userExists) {
            return res.render('auth/sign-up', { // Stay on sign-up page
                error: 'Email already registered',
                email: normalizedEmail,
            });
        }

        // if the user is not exist check if the entered password and confirm password are matched

         // Validate password match
        if (password !== confirmPassword) {
            return res.render('auth/sign-up', {
                error: 'Passwords do not match',
                email: normalizedEmail,
                first,
                last,
                address,
                phone
            });
        }

        // hashing the password using bcrypt library
        const hashedPassword = bcrypt.hashSync(password, 12);

        // create the user
        const user = await User.create(
        {
            first: first,
            last: last,
            email: normalizedEmail,
            password: hashedPassword,
            address: address,
            phone: phone,
            role: role,
            order: []
        })

        res.render('auth/thanks', { user });

    } catch (error) {
     console.error(chalk.red(`Registration error: ${error.message}`));
        res.render('auth/sign-up', {
            error: 'Registration failed. Please try again.',
            ...req.body
        });    }  
}


// Sign in controller
const signInUser = async (req, res) => {
    try {

        // create an object to store all the req.body variables
        const { 

            email,
            password,
            } = req.body;

            // search in database for the user by email
            const user = await User.findOne({ email: email }).populate('order');
            
            // if the user exist check the password is it matched with the saved password in the database using bcrypt        
            const validPassword = bcrypt.compareSync(password, user.password);

            //when password or user not matched

            if (!user || !validPassword) {
      
                return res.render('auth/sign-in', {
      
                    error: 'Invalid email or password',
      
                    email: email,
                    
                }
            )
        };

            

        
            // store user info in the session after successful authentication
        
            req.session.user = {
                email: user.email,
                _id: user._id,
                first: user.first,
                last: user.last,
                role: user.role,
                address: user.address,
                phone: user.phone
            };


            //check the user role is it admin or user        
            //if (role === 'admin') {

              console.log('Hi' + user.first +' your role in signIn is: ' + user.role)
        
                res.redirect(`/profile`);
        
          //  } else if (role === 'user') {
        
          //      res.redirect(`users/profile`);
          //  }
    
        } catch (error) {
    
            console.error(`${chalk.red('An error has occurred signing in a user!')} ${chalk.red(error.message)}`);
    
        }
    }

// Sign out controller

const signOutUser = (req, res) =>{

    try {
        
        // check the user session
        if (!req.session || !req.session.user) {
         // if there is no user info in the session redirect the user to sign in page           
            res.redirect('/sign-in')
        } else {
            // if the user is already sign and there is data in session destroy the data and redirect the user to home page
            req.session.destroy()
            res.redirect('/')
        }

    } catch (error) {

        console.error(`${chalk.red('An error has occurred signing out a user!')}` + `${chalk.red(error.message)}`)                

    }

}


//Update user Password Controller
const updatePassword = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            oldPassword,
            newPassword,
            confirmPassword

        }=req.body

        // find the user info in the database
        const user = await User.findById(id);
        if(!user) {
            return res.render('auth/userNotFound')
        }
        const validPassword = bcrypt.compareSync(
            oldPassword,
            user.password
        )
        if(!validPassword){
            let inValid = true
            return res.render('update-password',{errorMessage: 'Incorrect password, please try again!', inValid})
        }
        if (newPassword !== confirmPassword){
            let missMatch=true;
            return res.send('update-password',{errorMessage: 'Password and New password Mismatch, please try again!', missMatch});
        };
        const hashedPassword = bcrypt.hashSync(newPassword, 12);
        user.password=hashedPassword;
        await user.save();
         res.render('auth/confirm', {user: req.user})
    } catch (error) {
             console.error(`${chalk.red('An error has occurred updating a user!')}` + `${chalk.red(error.message)}`)                
    }
}

const profileRedirect = async(req, res) => {
    try{

        const userData = req.session.user;


        if (!userData) res.redirect('/sign-in')


        const user = await User.findById(userData._id).populate('order');

        console.log('Hi' + user.first +' your role in profileRedirect is: ' + user.role)

        console.log(userData);


        if (userData.role.toLocaleLowerCase() === 'admin') {
        res.render('./admins/adminProfile', { userData,user });
        }else if (userData.role.toLocaleLowerCase() === 'user'){
        res.render('users/userProfile', { userData,user });
        }



    } catch (error) {
        console.error(`${chalk.red('An error has occurred userProfile!')}` + `${chalk.red(error.message)}`)
    }
}
// export the modules
module.exports = {
    registerUser,
    signInUser,
    signOutUser,
    updatePassword,
    //adminProfile,
    profileRedirect,

}