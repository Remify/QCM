/**
 * Created by bouguerr on 27/01/2017.
 */


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

    });

    return io;

};