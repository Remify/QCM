
var socket = io.connect('http://localhost:3000');

$(document).ready(function () {

    // nom de la room
    var roomName = $('#dataRoom').data('roomName');
    // Ensemble des requêtes reçu par la room
    var submissions = []
    // Connection à la room
    socket.emit("roomConnect", {room: roomName, name: 'admin'});


    $('.toggleButton').change(function () {

        if (this.checked) {

            socket.emit("displayQuestionToRoom", {questionId: this.dataset.questionId, room: roomName});

        } else {

            socket.emit("hideQuestionToRoom", {questionId: this.dataset.questionId, room: roomName});
        }
    })
});