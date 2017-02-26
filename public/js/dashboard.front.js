
var socket = io.connect('http://localhost:3000');

$(document).ready(function () {

    // nom de la room
    var roomName = $('#dataRoom').data('roomName');
    // Ensemble des requêtes reçu par la room
    var submissions = []


    // Connection à la room
    socket.emit("connectDashboard", {room: roomName });
    
    socket.on('initRoomState', function (input) {
        console.log(input);
        if(input.state == 'started') {
            $('#toggleStartRoom').prop('checked', true);
        }

        input.questions.forEach(function (question) {
            $('.toggleButton.question[data-question-id='+ question.id +']').prop('checked', true)
        });

    })


    $('.toggleButton.question').change(function () {

        if (this.checked) {

            socket.emit("displayQuestionToRoom", {questionId: this.dataset.questionId, room: roomName});

        } else {

            socket.emit("hideQuestionToRoom", {questionId: this.dataset.questionId, room: roomName});
        }
    })

    //Afficher résultats par question
    $('.toggleButton.reponse').change(function () {
        if (this.checked) {
            socket.emit("displayRightAnswer", {questionId: $( "input[name='idQst']" ).val(), room: roomName});
        } else {
            socket.emit("hideRightAnswer", {questionId: $( "input[name='idQst']" ).val(), room: roomName});
        }
    })


    $('#toggleStartRoom').change(function () {

        if(this.checked) {
            socket.emit("roomStart", { room: roomName });
        } else {

            socket.emit("roomStop", { room: roomName });
        }
    })
});