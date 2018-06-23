var express = require('express');
var router = express.Router();
var UserModel = require('../models/userModel');

router.use('/generator', require('./generator.js'));

router.get('/', function(req, res) {
//    res.render('home');
    res.render('generator');
});

// GET - Register 
router.get('/register', function(req, res, next) {
    res.render('register');
});

// POST - Register
router.post('/register', function*(req, res, next) {
    
    // Do the passwords match? 
    if (req.body.password != req.body.passwordConf) {
        var err = new Error('Passwords do not match');
        err.status = 400;
        res.send('Passwords do not match');
        return next (err);
    }
    
    // Are all data present? 
    if (req.body.firstName && req.body.lastName && req.body.email && req.body.password) {
        
        var userData = new UserModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        });

        User.create(userData, function(err, user) {
           if (err) {
               return next(err);
           } else {
               req.session.user = user;
               req.session.userId = user._id;
               return res.redirect('/generator');
           }
        });
    } else {
        var err = new Error('All fields required');
        err.status = 400;
        return next(err);
    }
});

// GET - Login
router.get('/login', function(req, res, next) {
    res.render('login');
});


// POST - Login
router.post('/login', function(req, res, next) {
    User.authenticate(req.body.email, req.body.password, function(err, user) {
        if (user) {
            req.session.user = user;
            return res.redirect('/generator');
        } else {
            var err = new Error('Wrong email or password');
            err.status = 401;
            return next (err);
        }
    });
});

// GET - Logout
router.get('/logout', function(req, res, next){
    if (req.session) {
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            } else {
                return res.render('/');
            }
        });
    }
});

module.exports = router;