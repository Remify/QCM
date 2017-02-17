var express = require('express');
var router = express.Router();
var Question = require('../data/question')
var questionDAO = require('../data/questionDAO')


/* GET home page. */
router.get('/', function(req, res, next) {

        res.render('index');
});



module.exports = router;

