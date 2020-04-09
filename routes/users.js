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



module.exports = router;