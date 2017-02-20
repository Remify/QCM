
var questions = $('.question');


$(document).ready(function() {

    var roomName = $('#dataRoom').data('roomName');
    var registration = JSON.parse(localStorage.getItem('node-' + roomName));

    if(registration) {
        socket.emit("roomConnect", {room: registration.room, name: registration.name});
    }

    $('.question').each(function (question) {
        var question = this;
        var questionDiv = this;
        $.ajax({ url: '/room/dev/question/' + this.dataset.id + '/getResponses'}).done(function (res) {
            console.log(res);
            res.reponses.forEach(function (reponse) {
                var div = $("<div></div>")
                var radio = $("<input type='radio' name='reponse'   value='" + reponse.id + "' data-question-id='" + question.dataset.id +"'/>" );
                div.append(radio);
                div.append(reponse.intitule);
                $(questionDiv).find('form').first().append(div);

                // Abonnement à change
                $(radio).change(function() {
                    console.log('change');
                    var questionId = this.dataset.questionId;
                    var data = {
                        questionId : this.dataset.questionId,
                        responseId : this.value
                    }

                    console.log(data);
                    socket.emit("inputQuestion", data);

                });
            })
        });


    });



    socket.on("displayQuestion", function (data) {
        console.log(data);
    });

});