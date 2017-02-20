/**
 * Created by bouguerr on 27/01/2017.
 */


var Question = require('../data/question')
var questionDAO = require('../data/questionDAO')
var RoomDAO = require('../data/roomDAO')


// TODO : http://socket.io/docs/rooms-and-namespaces/
module.exports = function(server){

    var io = require("socket.io").listen(server);

    io.sockets.on('connection', function (socket) {
        console.log("un utilisateur s'est connecté");
        // Quand le serveur reçoit un signal de type "inputQuestion" du client
        socket.on('inputQuestion', function (data) {

            console.log(data);
            // io.emit pour envoyer à tout le monde
            io.emit('newSubmission', data);
        });

        // TODO : communication dans la room
        socket.on('roomConnect', function (input) {
            console.log(input.name + " s'est connecté à la room : " + input.room);
            socket.join(input.room);
            socket.broadcast.to(input.room).emit('hello', 'hello ' + input.name);
        });
        
        socket.on('displayQuestionToRoom', function (input) {

            console.log("display question : ")
            console.log(input);

            questionDAO.retrieveById(input.questionId, function (question) {
                socket.to(input.room).emit('displayQuestion', question);
            })

        })

    });

    return io;

};