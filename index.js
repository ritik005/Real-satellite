const express = require('express');
const path = require('path');
var EJS  = require('ejs');
var methodOverride = require('method-override');
var session = require('express-session');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');


require('./config/dbconnection');

const app = express();

var users = require('./routes/users');
var ideas = require('./routes/ideas');

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

const port = process.env.PORT || 1000;
app.listen(port, () =>{
    console.log(`server listen to port number ${port}`);
});