var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var router = express.Router();

//load user model
require('../models/Investor');
const Investor = mongoose.model('investor');

router.get('/login1', (req,res) => {
    res.render('investor/login1');
});
router.get('/register1', (req,res) => {
    res.render('investor/register1');
});

router.post('/login1', (req, res, next) => {
    passport.authenticate('investor-local', {
        successRedirect:'/sss',
        failureRedirect:'/investor/login1',
        failureFlash: true
    })(req, res, next);
});

router.post('/register1', (req, res) =>{
    let errors =[];

    if(req.body.password!= req.body.password2){
        errors.push({text:'Password do not match'});
    }
    if(req.body.password.length <4){
        errors.push({text:'Password must be atleast 4 character'});
    }
    if(errors.length > 0){
        res.render('/register', {
            errors :errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
    } else {
        Investor.findOne({email: req.body.email})
          .then(investor => {
              if(investor){
                  req.flash('error_msg', 'Email already registered');
                  res.redirect('/investors/register1');
              } else {
                const newInvestor = new Investor({
                    name: req.body.name,
                    email: req.body.email,
                    companyName: req.body.companyName,
                    password: req.body.password
                }); 
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newInvestor.password, salt, (err, hash) => {
                        if(err) throw err;
                        newInvestor.password = hash;
                        newInvestor.save()
                            .then(investor => {
                                req.flash('success_msg', 'You are now registered and can log in');
                                res.redirect('/investor/login1');
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
    res.redirect('/investor/login1');
});



module.exports = router;