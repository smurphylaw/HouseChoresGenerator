var mongoose = require('mongoose');

var householdSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

var Household = mongoose.model('Household', householdSchema);
module.exports = Household;
