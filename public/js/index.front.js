/**
 * Created by bouguerr on 24/01/2017.
 */


var socket = io.connect('http://localhost:3000');

$(document).ready(function() {


    $('#formLoginRoom').submit(function () {
        var name = $('#nameInput').val();
        var room = $('#roomInput').val();


        socket.emit('isUserInRoom', {name: name, room: room});

        socket.on('isUserInRoomResponse', function (bool) {
            console.log(bool);

            if(bool) {

                $('#alertNoAuth b').text('Erreur : ce nom d\'utilisateur est déjà utilisé ')
                $("#alertNoAuth").dialog();

            } else {
                sessionStorage.setItem("node-" + room, JSON.stringify({name: name, room: room}));
                $(location).attr('href', '/room/'+ room);
            }

        })


        return false;
    });



});
