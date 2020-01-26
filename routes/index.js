var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('find_mosque', { title: 'Mosque Q&A' });
});

module.exports = router;
