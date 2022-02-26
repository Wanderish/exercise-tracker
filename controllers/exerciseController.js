var Exercise = require('../models/exercise');
var User = require('../models/user')
let debug = require('debug')('exercise')
let moment = require('moment')

const { body, validationResult } = require('express-validator');

//GET request that fetches all exercises
exports.fetch_all_exercises = (req, res, next) => {
    let { userId, from, to, limit } = req.query;
    from = moment(from, 'YYYY-MM-DD').isValid() ? moment(from, 'YYYY-MM-DD') : 0;
    to = moment(to, 'YYYY-MM-DD').isValid() ? moment(to, 'YYYY-MM-DD') : moment().add(1000000000000);
    User.find({userId}).then(user => {
        if (!user) throw new Error('Unknown user with _id');
        Exercise.find({ userId })
            .where('date').gte(from).lte(to)
            .limit(+limit).exec()
            .then(log => res.status(200).send({
                _id: userId,
                username: user.username,
                count: log.length,
                log: log.map(o => ({
                    description: o.description,
                    duration: o.duration,
                    date: moment(o).format('ddd MMMM DD YYYY')
                }))
            }))
    })
        .catch(err => {
            debug(err);
            res.status(500).send(err.message);
        })
}

//POST request to create a new exercise entry
exports.create_new_exercise = [

    //Validate and sanitize all the required fields
    body('_id').trim().isAlphanumeric().escape().isLength({ min: 1 }).withMessage('_id is a required field.'),
    body('description').trim().escape().isLength({ min: 1 }).withMessage('Description is a required field.')
        .isAlphanumeric().withMessage('Description is a non-alphanumeric field.'),
    body('duration').trim().isNumeric().withMessage('Duration is a numeric field.')
        .isLength({ min: 1 }).withMessage('Duration is a required field.'),

    //process the request now post validation and sanitization
    (req, res, next) => {

        //extract the validation errors from the request (if any)
        var errors = validationResult(req);
        console.log('Body: ' + req.body._id);
        //check if 'errors' is empty or not and take necessary actions
        if (!errors.isEmpty()) {
            debug("Errors: " + errors.array());
            console.log('Errors: ' + errors.array());
            res.send('Please fill in all the required fields before proceeding further.');
        } else {
            //Data from form is valid. Proceed with further processing.

            //create new object of Exercise from the escaped and trimmed data
            var exercise = new Exercise({
                _id: req.body._id,
                description: req.body.description,
                duration: req.body.duration,
                date: (req.body.date === "" ? new Date().toDateString() : req.body.date)
            });
            console.log('Payload: ' + exercise);
            exercise.save((err, data) => {
                if (err) { 
                    debug('unable to save' + err);
                    console.log('unable to save' + err);
                    return next(err); 
                }
                console.log('Saved data: ' + data);
                res.send(data);
            });
        }
    }

];