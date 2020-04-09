var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

//Load idea model

require('../models/Idea');
var Idea = mongoose.model('ideas');

router.get('/', (req,res) => {
    Idea.find({})
    .sort({date:'desc'})
    .then(ideas => {
        res.render('ideas/index', {
            ideas:ideas
        });
    });
    
});
router.get('/add', (req, res) => {
    res.render('ideas/add');
});

router.post('/', (req,res) => {
    let errors = [];
    if(!req.body.title){
        errors.push({text:'Please add a name'});
    }
    if(!req.body.details){
        errors.push({text:'Please add some details'});
    }
    if(errors.length > 0){
        res.render('ideas/add',{
            errors: errors,
            title: req.body.title,
            details: req.body.details
        });
    }else{
        const newUser = {
            title: req.body.title,
            details: req.body.details
        }
        new Idea(newUser)
        .save()
        .then(idea => {
            // req.flash('success_msg', 'Idea added');
            res.redirect('/ideas');
        })
    }
    
});
module.exports = router;