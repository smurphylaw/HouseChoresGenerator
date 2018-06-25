var express = require('express');
var router = express.Router();
var ChoresModel = require('../models/ChoresModel');

var choresSchedule = [];

function makeSchedule(chores) {
    var length = chores.length;

    for (var i = 1; i < 6; i++) {    
        var count = 0;
        var tempChores = [];
        
        for(var j = 0; j < length; j++) {
            if (chores[j].priority == i) {
                count++;
                tempChores.push(chores[j]);
            }     
        }
        
        var done = false;
        while(!done) {
            var chore = tempChores[Math.floor(Math.random() * tempChores.length)];
            
            if (choresSchedule[0] == null) {
                choresSchedule.push(chore);    
            } else {
                var found = false;
                
                for (m = 0; m <= choresSchedule.length; m++) {
                    if (choresSchedule[m] == chore) {
                        found = true;
                    }
                }
                    
                if(!found) {
                    choresSchedule.push(chore);
                }
                
                if (choresSchedule.length = length) {
                    done = true;
                }
            }
        }
    }
    
    return choresSchedule;
}

// GET - Schedule 
router.get('/', function(req, res, next) {
    var context = {};
    
    if (res.locals.currentUser) {
        ChoresModel.find({ _user: req.session.userId })
            .then(chores => {
                res.render('schedule', { chores: chores });
            }).catch(err => {
                console.log(err);
        });
    }
});

// GET - Schedule Chore
router.get('/scheduleChore', function(req, res, next) {
    
    if (res.locals.currentUser) {
        ChoresModel.find({ _user: req.session.userId})
        .then(chores => {
            var scheduledChores = makeSchedule(chores);
            res.send(scheduledChores);
        }).catch(err => {
            console.log(err);
        });  
    } 
});

module.exports = router;