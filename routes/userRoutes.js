var router = require('express').Router();

var user_controller = require('../controllers/userController');

//GET request for fetching all the users
router.get('/users', user_controller.user_find_all);

//POST request for creating user
router.post('/users', user_controller.user_create_post);

module.exports = router;