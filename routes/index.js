var express = require('express');
var router = express.Router();

var questions = [
    {
        id : 1,
        titre : "Quelle est la couleur du cheval blanc d'Henry IV ?",
        reponses: [
            { id : 1, text : "Bleu" },
            { id : 2, text : "Blanc" },
            { id : 3, text : "Rouge"}
        ]
    },
    {
        id : 2,
        titre : "Qu'es ce qui est petit et marron ?",
        reponses:  [
            { id : 1, text : "Un petit Rouge" },
            { id : 2, text : "Un Marron" },
            { id : 3, text : "Un petit Marron"}
        ]
    }
];

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {questions : questions});
});



module.exports = router;

