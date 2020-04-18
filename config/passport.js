var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// load user and investor model
require('../models/User');
const User = mongoose.model('users');
require('../models/Investor');
const Investor = mongoose.model('investor');

module.exports = function(passport){
    passport.use('user-local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (username, password, done) => {
        //match user
        User.findOne({
            email: username
        }).then(user => {
            if(!user){
                return done(null, false, {message: 'No user Found'});
            } 
            // match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                     return done(null, user);
                } else {
                    return done(null, false, {message: 'Password incorrect'});
                }
            })
        })
    }));

    passport.use('investor-local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (username, password, done) => {
        //match user
        Investor.findOne({
            email: username
        }).then(investor => {
            if(!investor){
                return done(null, false, {message: 'No user Found'});
            } 
            // match password
            bcrypt.compare(password, investor.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                     return done(null, investor);
                } else {
                    return done(null, false, {message: 'Password incorrect'});
                }
            })
        })
    }));

    if(User) {
        passport.serializeUser(function(user, done) {            
              done(null, user.id);
          });
          passport.deserializeUser(function(id, done){
                User.findById(id, function(err, user) {
                    done(err, user);
                });
            });
    } else if(Investor){
        passport.serializeUser(function(investor, done) {            
            done(null, investor.id);
        });
        passport.deserializeUser(function(id, done){
              Investor.findById(id, function(err, investor) {
                  done(err, investor);
              });
          });
    }
}