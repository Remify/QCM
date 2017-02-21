var express = require('express');
var router = express.Router();
var Question = require('../data/question')
var questionDAO = require('../data/questionDAO')
var RoomDAO = require('../data/roomDAO')

router.get('', function (req, res, next) {
    //On envoie la liste des questions pour modification
    var questions = questionDAO.getAllQuestions(function (results) {
        res.render('admin/index', {questions: results});
    })
});



//modification / suppression de question
router.post('/question/edit', function (req, res, next) {
    if(req.body.action == 'Delete'){
         questionDAO.deleteQuestion(req.body.id, function () {
            res.redirect('/admin');
        });
    } else if(req.body.action == 'Update') {
        questionDAO.editQuestion(req.body.id, req.body.qValue,function () {
            res.redirect('/admin');
        });
    }

});

router.post('/question/new', function (req, res, next) {
    console.log(req.body);

    if (req.body.rIntitule && req.body.qIntitule) {

        qIntitule = req.body.qIntitule;
        questionDAO.newQuestion(qIntitule, function (questionId) {

            req.body.rIntitule.forEach(function (reponseIntitule) {
                // Si l'intitule est vide, il ne passe pas
                if (reponseIntitule) {
                    questionDAO.newReponse(reponseIntitule, questionId);
                }
            });
        });
    }
    res.redirect('/admin');
});

router.get('/rooms', function (req, res, next) {
    RoomDAO.getAll(function (results) {
        res.render('admin/rooms', {rooms: results});
    })
});

router.get('/room/:id', function (req, res, next) {


    console.log(router.stack);
    RoomDAO.retrieveById(req.params.id, function (results) {
        var room = results[0];
        if (room) {
            questionDAO.retrieveByRoomId(req.params.id, function (results) {
                var roomQuestions = results;

                questionDAO.getAllQuestions(function (results) {
                    res.render('admin/room', {room: room, questions: results, roomQuestions: roomQuestions});
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
router.post('/room/:id/update/questions', function (req, res, next) {
    var questionsId = req.body.questions.split(',').map(function (str) {
        return str.replace("question_", "");
    });

    RoomDAO.removeQuestions(req.params.id, function () {
        console.log(questionsId);

        /**
         * Vérifie si questionId existe / est vide
         */
        if (questionsId.length > 0 && questionsId[0]) {

            RoomDAO.addQuestions(req.params.id, questionsId, function (results) {
                res.redirect('/admin/room/' + req.params.id);
            });
        } else {
            // Si il n'y a pas de nouvelles questions, redirection vers la room
            res.redirect('/admin/room/' + req.params.id);
        }
    })

});


// TODO : session user : https://openclassrooms.com/courses/ultra-fast-applications-using-node-js/socket-io-let-s-go-to-real-time
router.get('/room/:id/dashboard', function (req, res, next) {


    /**
     * Création de la liste de question et ses reponses à envoyé
     * Nous utilisons l'identifiant unique de la question pour cette room : qUID
     */

    // Récuếration de l'id de la room
    RoomDAO.retrieveById(req.params.id, function (results) {
        var room = results[0];

        /**
         * Récupération des questions et leurs réponses.
         * Format :
         *  +----+----------+-----+-----------------------------------------------------+------+
            | id | intitule | qId | qIntitule                                           | qUID |
            +----+----------+-----+-----------------------------------------------------+------+
            | 7  | Blanc    | 3   | Qu'elle est la couleur du cheval Blanc d'Henry IV ? | 61   |
            +----+----------+-----+-----------------------------------------------------+------+
         */

        questionDAO.retrieveAllByRoomId(req.params.id, function (results) {

            // Tableau des questions unique
            questions = [];

            // Pour chaque entrée :
            results.forEach(function (line) {

                // Nous vérifions si qUID existe dans les questions
                if (typeof questions['' + line.qUID] === 'undefined') {

                    // Si non, on créer la question avec la premier réponse associé
                    var question = new Question(line.qUID, line.qIntitule);
                    question.reponses.push({id: line.id, intitule: line.intitule});

                    questions['' + question.id] = question;

                } else {
                    // Si oui, on ajoute la réponse
                    questions[line.qUID].reponses.push({id: line.id, intitule: line.intitule});
                }
            });

            res.render('admin/dashboard', {questions: questions, room: room});
        });

    })

});


router.get('/room/:id/results', function (req, res, next) {

    /**
     * Création de la liste de question et ses reponses à envoyé
     * Nous utilisons l'identifiant unique de la question pour cette room : qUID
     */

    // Récuếration de l'id de la room
    RoomDAO.retrieveById(req.params.id, function (results) {
        var room = results[0];

        questionDAO.retrieveAllByRoomId(req.params.id, function (results) {

            // Tableau des questions unique
            questions = [];

            // Pour chaque entrée :
            results.forEach(function (line) {

                // Nous vérifions si qUID existe dans les questions
                if (typeof questions['' + line.qUID] === 'undefined') {

                    // Si non, on créer la question avec la premier réponse associé
                    var question = new Question(line.qUID, line.qIntitule);
                    question.reponses.push({id: line.id, intitule: line.intitule});

                    questions['' + question.id] = question;

                } else {
                    // Si oui, on ajoute la réponse
                    questions[line.qUID].reponses.push({id: line.id, intitule: line.intitule});
                }
            });

            res.render('admin/results', {questions: questions, room: room});
        });

    })

});


/**
 * récupération des réponses en AJAX
 */
router.get('/question/:qId/getResponses', function(req, res, next) {
    questionDAO.retrieveById(req.params.qId, function (result) {
        res.send(result);
    });
});


module.exports = router;
