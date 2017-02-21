/**
 * Created by bouguerr on 27/01/2017.
 */


var Question = require('../data/question')
var questionDAO = require('../data/questionDAO')
var RoomDAO = require('../data/roomDAO')
var RoomsState = require('./rooms-state.service')

module.exports = function(server){

    var io = require("socket.io").listen(server);


    io.sockets.on('connection', function (socket) {

        // Quand le serveur reçoit un signal de type "inputQuestion" du client
        socket.on('inputQuestion', function (data) {

            console.log(data);
            // io.emit pour envoyer à tout le monde
            io.emit('newSubmission', data);
        });

        // TODO : communication dans la room
        socket.on('roomConnect', function (input) {

            if(RoomsState.getRoom(input.room) === undefined) {

                RoomsState.addRoom(input.room);

            } else {

                RoomsState.getRoom(input.room).questions.forEach(function (question) {
                    socket.emit('displayQuestion', question);
                });
            }


            console.log(RoomsState);
            socket.join(input.room);
        });
        
        socket.on('displayQuestionToRoom', function (input) {

            questionDAO.retrieveByQuestionUId(input.questionId, function (question) {

                RoomsState.addQuestionToRoom(input.room, question);

                io.sockets.in(input.room).emit('displayQuestion', question);
            })
        })


        socket.on('hideQuestionToRoom', function (input) {

            RoomsState.removeQuestionFromRoom(input.room, input.questionId);

            io.sockets.in(input.room).emit('hideQuestion', input.questionId);
        })

    });

    return io;

};