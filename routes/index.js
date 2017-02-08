var express = require('express');
var router = express.Router();
var Question = require('../data/question')
var questionDAO = require('../data/questionDAO')


/* GET home page. */
router.get('/', function(req, res, next) {

    questionDAO.retrieveById(1, function (q) {
        var questions = [q];
        console.log(questions);
        res.render('index', {questions : questions });
    })
});



module.exports = router;

