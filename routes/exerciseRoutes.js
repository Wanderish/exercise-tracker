var router = require('express').Router();

var exerciseController = require('../controllers/exerciseController');

//POST request for adding exercise
router.post('/users/:_id/exercises', exerciseController.create_new_exercise);

//GET request for getting all the exercises
router.get('/users/:_id/logs', exerciseController.fetch_all_exercises);

module.exports = router;
