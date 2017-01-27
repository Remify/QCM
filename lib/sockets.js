/**
 * Created by bouguerr on 27/01/2017.
 */

module.exports = function(server){

    var io = require("socket.io").listen(server);

    io.sockets.on('connection', function (socket) {

        // Quand le serveur reçoit un signal de type "inputQuestion" du client
        socket.on('inputQuestion', function (data) {

            console.log(data);
            // io.emit pour envoyer à tout le monde
            io.emit('newSubmission', data);
        });

    });

    return io;
};