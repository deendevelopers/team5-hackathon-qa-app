var express = require('express');
var router = express.Router();

var usersController = require('../controllers/UsersController');
var questionsController = require('../controllers/QuestionsController');
var responseController = require('../controllers/ResponseController');

/* GET users listing. */
router.get('/user/userId/:userId', usersController.getUserById);

router.post('/user/:name/:email/:role', usersController.addUserToDb);

module.exports = router;
