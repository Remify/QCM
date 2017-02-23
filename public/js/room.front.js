var questions = $('.question');


$(document).ready(function () {

    var roomName = $('#dataRoom').data('roomName');
    var registration = JSON.parse(sessionStorage.getItem('node-' + roomName));

    if (registration) {
        socket.emit("roomConnect", {room: registration.room, name: registration.name});
    } else {

        $("#alertNoAuth").dialog();

         setTimeout(function () {
             $(location).attr('href', '../../');
         }, 2500);
    }

    // Supprime la question
    socket.on("hideQuestion", function (idQuestion) {
        if ($(".question[data-id='" + idQuestion + "']").length > 0) {
            $(".question[data-id='" + idQuestion + "']").remove();
        }
    });

    socket.on('roomState', function (input) {
        if (input.state === 'stopped') {
            $('#roomState').text("La room n'a pas encore démarré.")
        } else {

            $('#roomState').text("La room est démarré")
        }
    })

    socket.on('reloadPage', function () {
        location.reload();
    })

    socket.on("displayQuestion", function (data) {

        console.log(data);
        if ($(".question[data-id='" + data.id + "']").length == 0) {

            var qDiv = $("<div class='question' data-id='" + data.id + "'></div>");
            qDiv.append($("<div class='intitule'>" + data.intitule + "</div>"));
            qDiv.append($("<div class='reponse'></div>").append($("<form></form>")));

            data.reponses.forEach(function (reponse) {
                var div = $("<div></div>")
                var radio = $("<input type='radio' id='r"+ reponse.id +"'  name='reponse'   value='" + reponse.id + "' data-question-id='" + data.id + "'/>");
                div.append(radio);
                div.append($("<label for='r" + reponse.id + "'>" + reponse.intitule + "</label>"));
                qDiv.find('form').append(div);

                // Abonnement à change
                $(radio).change(function () {
                    var questionId = this.dataset.questionId;
                    var data = {
                        questionId: this.dataset.questionId,
                        responseId: this.value,
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