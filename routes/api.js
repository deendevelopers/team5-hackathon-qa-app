var express = require('express');
var router = express.Router();

var usersController = require('../controllers/UsersController');
var questionsController = require('../controllers/QuestionsController');
var responseController = require('../controllers/ResponseController');

/* User endpoints */
router.get('/user/userId/', usersController.getUserById);

router.post('/user', usersController.addUserToDb);

router.get('/question/questionId', questionsController.getQuestionById)

router.post('/question', questionsController.addQuestionAndQaMapToDb);

module.exports = router;
