var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var router = express.Router();

//load user model
require('../models/User');
const User = mongoose.model('users');

router.get('/login', (req,res) => {
    res.render('users/login');
});
router.get('/register', (req,res) => {
    res.render('users/register');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('user-local', {
        successRedirect:'/ideas',
        failureRedirect:'/users/login',
        failureFlash: true
    })(req, res, next);
});

router.post('/register', (req, res) =>{
    const {name, email, password, password2 } = req.body;
    let errors = [];
    if(!name || !email || !password || !password2){
        errors.push({ msg: 'Please fill in all fields'});
    }
    if(password!=password2){
        errors.push({msg: 'Please enter same password'});
    }
    if(password<4){
        errors.push({msg: 'Check the length of password'});
    }
    if(errors.length >0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
    }
     else {
        User.findOne({email: req.body.email})
          .then(user => {
              if(user){
                  req.flash('error_msg', 'Email already registered');
                  res.redirect('/users/register');
              } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                }); 
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You are now registered and can log in');
                                res.redirect('/users/login');
                            })
                            .catch(err => {
                                console.log(err);
                                return;
                            });
                        });
                    });
              }
          });
        
         }
});

//Logout User
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});



module.exports = router;