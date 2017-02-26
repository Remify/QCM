/**
 * Created by bouguerr on 27/01/2017.
 */


var Question = require('../data/question')
var questionDAO = require('../data/questionDAO')
var RoomDAO = require('../data/roomDAO')

module.exports = function(server, RoomsState){

    var io = require("socket.io").listen(server);


    io.sockets.on('connection', function (socket) {
        
        socket.on('isUserInRoom', function (input) {
            console.log('is user in Room')
            console.log(RoomsState.getRoom(input.room).users.indexOf(input.name));
            if(RoomsState.getRoom(input.room).users.indexOf(input.name) >= 0) {
                console.log('user exist')
                socket.emit('isUserInRoomResponse', true)
            } else {

                socket.emit('isUserInRoomResponse', false)
            }

        })

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
                console('create room')
                RoomsState.addRoom(input.room);
            }


            if(RoomsState.getRoom(input.room).state === 'started') {

                RoomsState.getRoom(input.room).questions.forEach(function (question) {
                    socket.emit('displayQuestion', question);
                });
            }

            // envoie de l'état de la room à l'utilisateur
            socket.emit('roomState', {state: RoomsState.getRoom(input.room).state});

            // Ajout de l'utilisateur à la room
            var status = RoomsState.newRoomUser(input.room, input.name);

            socket.join(input.room);
            io.sockets.in(input.room).emit('newUser', input.name);


        })
        
        socket.on('displayQuestionToRoom', function (input) {

            questionDAO.retrieveByQuestionUId(input.questionId, function (question) {

                RoomsState.addQuestionToRoom(input.room, question);

                if(RoomsState.getRoom(input.room).state === 'started') {

                    console.log(io.sockets.in(input.room))
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


        //Afficher réponse juste
        socket.on('displayRightAnswer', function (input) {
            questionDAO.getReponseJuste(input.questionId, function (result) {
                console.log(result)
                io.sockets.in(input.room).emit('reponseJuste', result);
            });
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