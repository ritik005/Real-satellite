const express = require('express');
const path = require('path');
const EJS  = require('ejs');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');


require('./config/dbconnection');

const app = express();

var users = require('./routes/users');
var ideas = require('./routes/ideas');
var investor = require('./routes/investor');

// passport config
require('./config/passport')(passport);

require('./models/User');
const User = mongoose.model('users');
require('./models/Idea');
const Idea = mongoose.model('ideas');


app.set('view engine', 'ejs');

app.use(express.urlencoded({
    extended: false
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//load static files

app.use(express.static(path.join(__dirname, 'public')));


// Method override middleware

app.use(methodOverride('_method'));

// Express session middleware

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//global variables
app.use(function(req,res,next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Basic routing

app.get('/', (req,res) => {
    const title = 'Welcome';
    res.render('index', {
        title: title
    });
});
app.get('/about', (req,res) => {
    res.render('about');
});

app.use('/users', users);
app.use('/ideas', ideas);
app.use('/investor',investor);

const port = process.env.PORT || 1000;
app.listen(port, () =>{
    console.log(`server listen to port number ${port}`);
});