var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userName: {type: String, unique: true }
});

//Export the module
module.exports = mongoose.model('User', UserSchema)