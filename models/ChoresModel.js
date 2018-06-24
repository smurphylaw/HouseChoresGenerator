var mongoose = require('mongoose');

var choresSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    priority: {
        type: Number
    },
    difficulty: {
        type: Number
    },
    frequency: {
        type: String
    }
});

var Chores = mongoose.model('Chores', choresSchema);
module.exports = Chores;
