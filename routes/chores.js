var express = require('express');
var router = express.Router();
var ChoresModel = require('../models/ChoresModel');

// GET - Chores 
router.get('/', function(req, res, next) {
    res.render('chores');
});

// GET - Add Chores
router.get('/add', function(req, res, next) {
    res.render('addChore');
});

// POST - Add Chore
router.post('/add', function(req, res, next) {
    
    // Is the name present? 
    if (req.body.name) {
        
        var choresData = {
            name: req.body.name,
            description: req.body.description,
            priority: req.body.priority,
            difficulty: req.body.difficulty,
            frequency: req.body.frequency
        };

        ChoresModel.create(choresData, function(err, user) {
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

module.exports = router;