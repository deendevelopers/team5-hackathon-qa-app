var express = require('express');
var router = express.Router();

var usersController = require('../controllers/UsersController');
var questionsController = require('../controllers/QuestionsController');
var responseController = require('../controllers/ResponseController');

/* User endpoints */
router.get('/user/userId/', usersController.getUserById);

router.post('/user', usersController.addUserToDb);

module.exports = router;
