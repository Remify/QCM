/**
 * Created by bouguerr on 24/01/2017.
 */

var questions = $('.question');

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

    $('#roomInput').change(function () {

        socket.emit("roomConnect", this.value);
        $(location).attr('href', 'room/'+this.value + "/" + socket.id);
    });


    socket.on("hello", function (data) {
        console.log(data);
    });
});