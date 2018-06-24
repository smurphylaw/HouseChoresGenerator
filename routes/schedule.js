var express = require('express');
var router = express.Router();

// GET - Schedule 
router.get('/', function(req, res, next) {
    res.render('schedule');
});

module.exports = router;