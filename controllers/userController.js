var User = require('../models/user');
var async = require('async');
var debug = require('debug')('user')

//GET request to Users
exports.user_find_all = (req, res, next) => {
    var usersList = [];
    async.series({
        users: (callback) => {
            User.find({}).exec(callback)
        },
    }, (err, results) => {
        if(err) { 
            debug('update error: ' + err); 
            return next(err);
        }
        if(results.userName === null){
            var err = new Error('User not found');
            err.status = 404;
            next(err);
        }
        //Add all users into a list
        for(const user of results.users) {
            usersList.push({"_id": user._id, "username": user.userName})   
        }
        res.json(usersList);
    });
}

//POST request to Users
exports.user_create_post = (req, res) => {
    //assuming that the user name is valid
    var user = new User({
        userName: req.body.username
    });
    user.save((err, result) => {
        if(err) { return res.send('Username already exists. Please choose another one.'); }
        res.json({
            username: result.userName,
            _id: result._id
        })
    });
};