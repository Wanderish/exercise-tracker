var mongoose  = require('mongoose');
var Schema = mongoose.Schema;

var ExerciseSchema = new Schema({
    _id: {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: String, default: new Date().toDateString()}
})

//Export the model to be used in other places
module.exports = mongoose.model('Exercise', ExerciseSchema);