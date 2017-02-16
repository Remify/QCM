var express = require('express');
var router = express.Router();
var Question = require('../data/question')
var questionDAO = require('../data/questionDAO')
var RoomDAO = require('../data/roomDAO')

router.get('', function(req, res, next) {
    res.render('admin/index');
});

router.post('/question/new', function(req, res, next) {
    console.log(req.body);
    
    if(req.body.rIntitule && req.body.qIntitule) {

        qIntitule = req.body.qIntitule;
        questionDAO.newQuestion(qIntitule, function (questionId) {

            req.body.rIntitule.forEach(function (reponseIntitule) {
                // Si l'intitule est vide, il ne passe pas
                if(reponseIntitule) {
                    questionDAO.newReponse(reponseIntitule, questionId);
                }
            });

        });



    }
    res.redirect('/admin');
});

router.get('/rooms', function(req, res, next) {
    RoomDAO.getAll(function (results) {
        res.render('admin/rooms', {rooms: results} );
    })
});

module.exports = router;
