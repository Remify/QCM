var express = require('express');
var router = express.Router();
var questions = require('../data/question');


/* GET users listing. */

// TODO : session user : https://openclassrooms.com/courses/ultra-fast-applications-using-node-js/socket-io-let-s-go-to-real-time
router.get('/', function(req, res, next) {
    res.render('results', {questions : questions});
});

module.exports = router;
