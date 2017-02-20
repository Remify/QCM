var express = require('express');
var router = express.Router();
var Question = require('../data/question');
var questionDAO = require('../data/questionDAO');
var RoomDAO = require('../data/roomDAO');

router.get('/:room/', function(req, res, next) {


        RoomDAO.retrieveByName(req.params.room, function (room) {
            if(room) {

                questionDAO.retrieveByRoomId(room.id, function (questions) {
                    console.log(questions);
                    res.render('room', {room: req.params.room, questions: questions} );
                })

            } else {
                res.render('error', {message: "Cette room n'existe pas", error: "404"});
            }
        })


});


module.exports = router;
