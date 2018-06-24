var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ChoresModel = require('../models/ChoresModel');
//var User = mongoose.model('User');
var mid = require('./authChecker.js')

// GET - Chores 
router.get('/', function(req, res, next) {
    
    ChoresModel.find({ _user: req.session.userId })
        .sort('name')
        .then(chores => {
            res.render('chores', { chores: chores });
//            console.log(chores);
        }).catch(err => {
            console.log(err);
    });
});

// GET - Add Chores
router.get('/add', function(req, res, next) {
    res.render('addChore');
});

// POST - Add Chore
router.post('/add', function(req, res, next) {

    var id = req.session.userId;

    // Is the name present? 
    if (req.body.name) {
        
        var choresData = {
            name: req.body.name,
            description: req.body.description,
            priority: req.body.priority,
            difficulty: req.body.difficulty,
            frequency: req.body.frequency,
            _user: req.session.userId
        };

        ChoresModel.create(choresData, function(err, chores) {
           if (err) {
               return next(err);
           } else {
               return res.redirect('/chores');
           }
        });
        
    } else {
        var err = new Error('Cannot add Chore');
        err.status = 400;
        return next(err);
    }
});

// DELETE - Chore

router.delete('/', function(req, res){
    console.log('id: ' + req.body._id)
    ChoresModel.remove({_id: req.body._id});
})

module.exports = router;