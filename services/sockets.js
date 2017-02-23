/**
 * Created by bouguerr on 27/01/2017.
 */


var Question = require('../data/question')
var questionDAO = require('../data/questionDAO')
var RoomDAO = require('../data/roomDAO')

module.exports = function(server, RoomsState){

    var io = require("socket.io").listen(server);


    io.sockets.on('connection', function (socket) {

        // Quand le serveur reçoit un signal de type "inputQuestion" du client
        socket.on('inputQuestion', function (data) {

            // io.emit pour envoyer à tout le monde
            io.emit('newSubmission', data);
        })

        // TODO : communication dans la room
        socket.on('roomConnect', function (input) {
            console.log(input);
            // Si la room n'existe pas dans RoomService, nous l'ajoutons
            if(RoomsState.getRoom(input.room) === undefined) {
                RoomsState.addRoom(input.room);
            }


            if(RoomsState.getRoom(input.room).state === 'started') {

                RoomsState.getRoom(input.room).questions.forEach(function (question) {
                    socket.emit('displayQuestion', question);
                });
            }

            // envoie de l'état de la room à l'utilisateur
            socket.emit('roomState', {state: RoomsState.getRoom(input.room).state});

            var status = RoomsState.newRoomUser(input.room, input.name);
            if(status.code === 200) {
                socket.join(input.room);
            } else {
                socket.emit('kick', status);
            }

        })
        
        socket.on('displayQuestionToRoom', function (input) {

            questionDAO.retrieveByQuestionUId(input.questionId, function (question) {

                RoomsState.addQuestionToRoom(input.room, question);

                if(RoomsState.getRoom(input.room).state === 'started') {

                    io.sockets.in(input.room).emit('displayQuestion', question);
                }
            })
        })


        socket.on('hideQuestionToRoom', function (input) {

            RoomsState.removeQuestionFromRoom(input.room, input.questionId);

            io.sockets.in(input.room).emit('hideQuestion', input.questionId);
        })

        socket.on('roomStart', function (input) {

            RoomsState.getRoom(input.room).changeState('started');

            io.sockets.in(input.room).emit('reloadPage', {});
        })


        socket.on('roomStop', function (input) {

            RoomsState.getRoom(input.room).changeState('stopped');

            io.sockets.in(input.room).emit('reloadPage', {});
        })
        
        socket.on('connectDashboard', function (input) {
            var roomState = RoomsState.getRoom(input.room);
            socket.emit('initRoomState', roomState);


            socket.join(input.room);
        })

    });

    return io;

};