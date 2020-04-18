// var LocalStrategy = require('passport-local').Strategy;
// var mongoose = require('mongoose');
// var bcrypt = require('bcryptjs');

// // load user model
// require('../models/Investor');
// const Investor = mongoose.model('investor');
// module.exports = function(passport){
//     passport.use(new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password'
//     }, (username, password, done) => {
//         //match user
//         Investor.findOne({
//             email: username
//         }).then(investor => {
//             // match password
//             bcrypt.compare(password, investor.password, (err, isMatch) => {
//                 if(!err && investor && isMatch){
//                      return done(null, investor);
//                 }
//             })
//         })
//         User.findone({
//             email: username
//         }).then(user => {
//             bcrypt.compare(password, user.password, (err, isMatch) => {
//                 if(!err && user && isMatch){
//                     return done(null, user);
//                }
//             })
//         })
//         return done(null, false, {message: 'No user Found'});
//     }));

//     passport.serializeUser(function(investor, done) {
//         done(null, investor.id);
//     });

//     passport.deserializeUser(function(id, done){
//         Investor.findById(id, function(err, user) {
//             done(err, investor);
//         });
//     });
// }