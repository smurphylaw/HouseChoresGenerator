var express = require('express');
var router = express.Router();
var HouseholdsModel = require('../models/HouseholdModel');

// GET - Household 
router.get('/', function(req, res, next) {
    res.render('household');
});

// POST - Add Household
router.post('/', function(req, res, next) {
    
    res.redirect('/');
    
});

// GET - Add Household
//router.get('/add', function(req, res, next) {
//    res.render('addHousehold');
//});

module.exports = router;