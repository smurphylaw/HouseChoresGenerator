// Adapt from https://medium.com/of-all-things-tech-progress/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    passwordConf: {
        type: String,
        required: true
    }
});

// Authenticate input against database
userSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({
        email: email
    }).exec(function(err, user) {
        if (err) {
            return callback(err);
        } else if (!user) {
            var err = new Error('User not found');
            err.status = 401;
            return callback(err);
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (result == true) {
                return callback(null, user);
            } else {
                return callback();
            }
        })
        
    });
}


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


// Adapt from http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
//userSchema.methods.comparePassword = function(candidate, callback) {
//    bcrypt.compare(candidate, this.password, function (err, isMatch) {
//        if (err) {
//            return callback(err);
//        }
//        callback(null, isMatch);
//    })
//}

var UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
