var express = require('express');
var router = express.Router();

var usersController = require('../controllers/UsersController');
var questionsController = require('../controllers/QuestionsController');
var responseController = require('../controllers/ResponseController');

/* GET users listing. */
router.get('/user/userId/:userId', userController.getUserById);

router.post('/user/:name/:email/:role', userController.addUserToDb);

module.exports = router;
