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

router.get('/room/:id', function(req, res, next) {


    console.log(router.stack);
    RoomDAO.retrieveById(req.params.id, function (results) {
        var room = results[0];
        if(room) {
            questionDAO.retrieveByRoomId(req.params.id, function (results) {
                var roomQuestions = results;
                
                questionDAO.getAllQuestions(function (results) {
                    res.render('admin/room', {room: room, questions: results, roomQuestions: roomQuestions} );
                })
            });
        } else {
            res.render('error', {message: "Cette room n'existe pas", error: "404"});
        }
    })
});

/**
 * Mise à jour des questions d'une room.
 * D'abord on supprime les entrées dans room_questions, puis on ajoute les nouvelles (Bourrain mais efficace !)
 */
router.post('/room/:id/update/questions', function(req, res, next) {
    var questionsId = req.body.questions.split(',').map(function (str) {
        return str.replace("question_", "");
    });
    
    RoomDAO.removeQuestions(req.params.id, function () {
        console.log(questionsId);

        /**
         * Vérifie si questionId existe / est vide
         */
        if(questionsId.length > 0 && questionsId[0]) {

            RoomDAO.addQuestions(req.params.id, questionsId, function (results) {
                res.redirect('/admin/room/' + req.params.id);
            });
        } else {
            // Si il n'y a pas de nouvelles questions, redirection vers la room
            res.redirect('/admin/room/' + req.params.id);
        }
    })

});

module.exports = router;
