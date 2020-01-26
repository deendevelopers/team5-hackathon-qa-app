var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mosque Q&A' });
});

router.get('/find-mosque', function(req, res, next) {
  res.render('find_mosque', { title: 'Mosque Q&A' });
});

router.get('/ask-question', function(req, res, next) {
  res.render('question', { title: 'Mosque Q&A' });
});

router.post('/success', function(req, res, next) {
  let data = {
    category: req.body["category-id"],
    question: req.body.question
  };
  res.render('success', { title: 'Mosque Q&A', ...data });
});

module.exports = router;
