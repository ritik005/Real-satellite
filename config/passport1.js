var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// load user model
require('../models/Investor');
const Investor = mongoose.model('investor');

module.exports = function(passport){
    passport.use(new LocalStrategy({
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

    passport.serializeUser(function(investor, done) {
        done(null, investor.id);
    });

    passport.deserializeUser(function(id, done){
        Investor.findById(id, function(err, user) {
            done(err, investor);
        });
    });
}