var router = require('express').Router();

var user_controller = require('../controllers/userController');
var exerciseController = require('../controllers/exerciseController');

//GET request for fetching all the users
router.get('/users', user_controller.user_find_all);

//POST request for creating user
router.post('/users', user_controller.user_create_post);

//POST request for adding exercise
router.post('/users/:_id/exercises', exerciseController.create_new_exercise);

//GET request for getting all the exercises
router.get('/users/:_id/logs', exerciseController.fetch_all_exercises);

module.exports = router;