var express = require('express');
var router = express.Router();
var Question = require('../data/question');
var questionDAO = require('../data/questionDAO');
var RoomDAO = require('../data/roomDAO');
var NiveauDAO = require('../data/niveauDAO');
var MatiereDAO = require('../data/matiereDAO');

router.get('', function (req, res, next) {

    //On envoie la liste des questions pour modification
    var questions = questionDAO.getAllQuestions(function (results) {
        res.render('admin/index', {questions: results});
    });
});


router.get('/question/:id?', function (req, res, next) {
    //On envoie la liste des questions pour modification
    if(req.params.id) {
        
        questionDAO.retrieveById(req.params.id, function (question) {

            NiveauDAO.getAll(function (niveaux) {
                
                MatiereDAO.getAll(function (matieres) {

                    var questions = questionDAO.getAllQuestions(function (results) {
                        console.log(question)
                        res.render('admin/question', {questions: results, question: question, niveaux: niveaux, matieres: matieres});
                    });

                })

            })

        })
        
        
    } else {
        var questions = questionDAO.getAllQuestions(function (results) {
            res.render('admin/question', {questions: results, question: undefined});
        });
    }

});

router.get('/new/question', function (req, res, next) {

    NiveauDAO.getAll(function (niveaux) {

        MatiereDAO.getAll(function (matieres) {

            res.render('admin/newQuestion', {matieres: matieres, niveaux:niveaux});

        });

    });

});

//test afficher réponses justes
router.post('/affRep', function (req, res, next) {
    questionDAO.getReponseJuste(req.body.id);
    res.redirect('/admin/room/' + req.body.id + '/dashboard');
})


//ajout de reponse question existante
router.post('/reponse/new', function(req, res, next){
    questionDAO.newReponse(req.body.rIntitule, req.body.Qid, function () {
    });
    questionDAO.getReponseByQuestionId(req.body.Qid, function (reponses) {
        res.render('reponses',{reponses: reponses});
    })
});

router.post('/question/delete/reponse', function (req, res, next) {
    questionDAO.deleteReponse(req.body.id, function () {
        res.redirect('/admin/question/' + req.body.qId);
    });
});

router.post('/question/edit', function (req, res, next) {


    if(! req.body.id_matiere) {
        req.body.id_matiere = null
    }
    if(! req.body.id_niveau) {
        req.body.id_niveau = null
    }
    console.log(req.body);

    // Gestion des réponses
    var reponsesKeys = Object.keys(req.body).filter(function (key) {
        return key.indexOf('reponse') >= 0
    })

    var reponses = [];

    // Construction des réponses
    reponsesKeys.forEach(function (reponse) {

            var isTrue = 0;

            if(typeof req.body[reponse][2] !== 'undefined') {
                isTrue = 1 ;
            }


            reponses.push({
                id: req.body[reponse][0],
                intitule: req.body[reponse][1],
                isTrue: isTrue
            })
    })

    // Gestion des nouvelles réponses :
    var newReponses = [];
    if(req.body.new) {
        var news = [];
        if(! Array.isArray(req.body.new)) {
            news.push(req.body.new)
        }

        news.forEach(function (n) {
            if(n !== "on") {
                newReponses.push({
                    id: '',
                    intitule: n,
                    isTrue: 0
                });
            } else {
                newReponses[newReponses.length - 1].isTrue = 1;
            }
        })
    }
    newReponses.forEach(function (reponse) {
        questionDAO.newReponse(reponse.intitule, req.body.id, reponse.isTrue, function () {

        })
    })


    // Enregistrements
    reponses.forEach(function (reponse) {
        questionDAO.editReponse(reponse.id, reponse.intitule, reponse.isTrue, req.body.id, function (results) {
        })
    })

    questionDAO.editQuestion(req.body.id, req.body.intitule, req.body.id_niveau, req.body.id_matiere, function (results) {
        res.redirect('/admin/question/' + req.body.id);
    });

});

router.post('/question/delete', function (req, res, next) {
    questionDAO.deleteQuestion(req.body.id, function () {
        res.redirect('/admin/question/')
    })
});

router.post('/question/new', function (req, res, next) {

    if(! req.body.matiere) {
        req.body.matiere = null
    }
    if(! req.body.niveau) {
        req.body.niveau = null
    }

    console.log(req.body)

    questionDAO.newQuestion(req.body.qIntitule, req.body.niveau, req.body.matiere, function (questionId) {

        req.body.rIntitule.forEach(function (reponseIntitule, index) {

            // Si l'intitule est vide, il ne passe pas
            if (reponseIntitule) {
                questionDAO.newReponse(reponseIntitule, questionId, req.body.istrue[index]);
            }
        });
    });

    res.redirect('/admin/question/');
});

router.get('/rooms', function (req, res, next) {
    RoomDAO.getAll(function (results) {
        res.render('admin/rooms', {rooms: results});
    })
});

router.get('/room/:id', function (req, res, next) {


    RoomDAO.retrieveById(req.params.id, function (results) {
        var room = results[0];
        if (room) {
            questionDAO.retrieveByRoomId(req.params.id, function (results) {
                var roomQuestions = results;

                questionDAO.getAllQuestions(function (results) {
                    console.log(results)

                    res.render('admin/room', {room: room, questions: results, roomQuestions: roomQuestions});
                })
            });
        } else {
            res.render('error', {message: "Cette room n'existe pas", error: "404"});
        }
    })
});

router.post('/room/new', function (req, res, next) {

    RoomDAO.create(req.body.roomIntitule, function (results) {
        res.redirect('/admin/room/' + results.insertId)
    })

});

router.post('/room/delete', function (req, res, next) {

    RoomDAO.delete(req.body.id, function () {
        res.redirect('/admin/rooms')
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


router.get('/room/:id/dashboard', function (req, res, next) {


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

                    // Si non, on crée la question avec la première réponse associée
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

        //TODO : appliquer uniquement aux questions passées en paramètre
        questionDAO.retrieveAllByRoomId(req.params.id, function (results) {

            // Tableau des questions uniques
            questions = [];

            // Pour chaque entrée :
            results.forEach(function (line) {

                // Nous vérifions si qUID existe dans les questions
                if (typeof questions['' + line.qUID] === 'undefined') {

                    // Si non, on crée la question avec la première réponse associée
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


/**
 * 
 */
router.get('/niveau/:id?', function(req, res, next) {
    NiveauDAO.getAll(function (results) {
        var niveau = undefined

        niveau = results.filter(function (n) {
            return n.id == req.params.id
        })

        console.log(results)
        res.render('admin/niveau', { niveaux: results, niveau: niveau[0] })
    })
});


router.post('/niveau/edit', function (req, res, next) {
    var niveau = {id: req.body.id, intitule: req.body.intitule } ;
    NiveauDAO.update(req.body.id, req.body.intitule, function (results) {

        res.redirect('/admin/niveau/');
    })
});

router.post('/niveau/delete', function (req, res, next) {
    NiveauDAO.delete(req.body.id, function () {
        res.redirect('/admin/niveau/');
    })
});

router.post('/niveau/new', function (req, res, next) {
    NiveauDAO.new(req.body.intitule, function () {
        res.redirect('/admin/niveau/');
    })
});

/**
 *
 */
router.get('/matiere/:id?', function(req, res, next) {
    MatiereDAO.getAll(function (results) {
        var matiere = undefined

        matiere = results.filter(function (n) {
            return n.id == req.params.id
        })

        res.render('admin/matiere', { matieres: results, matiere: matiere[0] })
    })
});
router.post('/matiere/edit', function (req, res, next) {
    var matiere = {id: req.body.id, intitule: req.body.intitule } ;
    MatiereDAO.update(req.body.id, req.body.intitule, function (results) {

        res.redirect('/admin/matiere/');
    })
});

router.post('/matiere/delete', function (req, res, next) {
    MatiereDAO.delete(req.body.id, function () {
        res.redirect('/admin/matiere/');
    })
});

router.post('/matiere/new', function (req, res, next) {
    MatiereDAO.new(req.body.intitule, function () {
        res.redirect('/admin/matiere/');
    })
});

module.exports = router;
