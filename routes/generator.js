var express = require('express');
var router = express.Router();
//var UserModel = require('../models/userModel');
var ChoresModel = require('../models/ChoresModel');

var listOfChores = ['Take out the trash', 'Wash the car', 'Vacuum your bedroom', 'Do the dishes', 'Clean surface area in living room'];

// GET - Generator 
router.get('/', function(req, res, next) {
    var context = {};
    
    if (res.locals.currentUser) {
        ChoresModel.find({ _user: req.session.userId })
            .then(chores => {
                res.render('generator', { chores: chores });
            }).catch(err => {
                console.log(err);
        });
    } else {
        context.chores = listOfChores;
        res.render('generator', context);    
    }
});

// GET - Choose Chore 
router.get('/chooseChore', function(req, res, next) {
    var context = {};
    
    if (res.locals.currentUser) {
        ChoresModel.find({ _user: req.session.userId })
            .then(chores => {
                var chore = chores[Math.floor(Math.random() * chores.length)];
               
                res.send(chore.name);
            }).catch(err => {
                console.log(err);
        });
    } else {
        var chore = listOfChores[Math.floor(Math.random() * listOfChores.length)];
       
        res.send(chore); 
    }
});

module.exports = router;