
var questions = $('.question');


$(document).ready(function() {

    var roomName = $('#dataRoom').data('roomName');
    var registration = JSON.parse(localStorage.getItem('node-' + roomName));

    if(registration) {
        socket.emit("roomConnect", {room: registration.room, name: registration.name});
    }

    // Supprime la question
    socket.on("hideQuestion", function (idQuestion) {
        if($(".question[data-id='"+ idQuestion +"']").length > 0) {
            $(".question[data-id='"+ idQuestion +"']").remove();
        }
    });
    
    socket.on('reloadPage', function () {
        location.reload();
    })

    socket.on("displayQuestion", function (data) {

        console.log(data);
        if($(".question[data-id='" + data.id + "']").length == 0) {

            var qDiv = $("<div class='question' data-id='" + data.id +"'></div>");
            qDiv.append($("<div class='intitule'>" + data.intitule + "</div>"));
            qDiv.append($("<div class='reponse'></div>").append($("<form></form>")));

            data.reponses.forEach(function (reponse) {
                var div = $("<div></div>")
                var radio = $("<input type='radio' name='reponse'   value='" + reponse.id + "' data-question-id='" + data.id +"'/>" );
                div.append(radio);
                div.append(reponse.intitule);
                qDiv.find('form').append(div);

                // Abonnement à change
                $(radio).change(function() {
                    var questionId = this.dataset.questionId;
                    var data = {
                        questionId : this.dataset.questionId,
                        responseId : this.value,
                        user: registration.name
                    }

                    console.log(data);
                    socket.emit("inputQuestion", data);

                });
            });

            $('.container').append(qDiv);
        }

    });

});