// Adapt from https://medium.com/of-all-things-tech-progress/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    chores: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chores'
    }
});

// Authenticate input against database
userSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({ email: email })
        .exec(function(error, user) {
        if (error) {
            return callback(error);
        } else if (!user) {
            var err = new Error('User not found');
            err.status = 401;
            return callback(err);
        }
        bcrypt.compare(password, user.password, function (error, result) {
            if (result === true) {
                return callback(null, user);
            } else {
                return callback();
            }
        })
        
    });
}

// Hash password before saving
userSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
       if (err) {
           return next(err);
       }
    
       // Override password with hash
       user.password = hash;
       next();
    });
});

var User = mongoose.model('User', userSchema);
module.exports = User;
