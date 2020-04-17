var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var router = express.Router();

router.get('/login1', (req,res) => {
    res.render('investor/login1');
});
router.get('/register1', (req,res) => {
    res.render('investor/register1');
});

module.exports = router;