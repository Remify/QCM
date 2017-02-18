/**
 * Created by bouguerr on 24/01/2017.
 */


var socket = io.connect('http://localhost:3000');

$(document).ready(function() {


    $('#formLoginRoom').submit(function () {
        var name = $('#nameInput').val();
        var room = $('#roomInput').val();

        socket.emit("roomConnect", {room: room, name: name});
        $(location).attr('href', '/room/'+ room + "/" + socket.id);
        return false;
    });



});
