/**
 * Created by bouguerr on 24/01/2017.
 */

var questions = $('.question');
var socket = io.connect('http://localhost:3000');


$(document).ready(function() {

    $('.reponse input[type=radio]').change(function() {
        var questionId = this.dataset.questionId;

        var data = {
            questionId : this.dataset.questionId,
            responseId : this.value
        }


        console.log(data);
        socket.emit("inputQuestion", data);

    });

    $('#connectToRoom').click(function () {
        var name = $('#nameInput').val();
        var room = $('#roomInput').val();
        socket.emit("roomConnect", {room: room, name: name});
        //$(location).attr('href', 'room/'+this.value + "/" + socket.id);
    });


    socket.on("hello", function (data) {
        console.log(data);
    });
});