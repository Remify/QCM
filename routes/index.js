var express = require('express');
var router = express.Router();
var questions = require('../data/questions');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {questions : questions});
});



module.exports = router;

