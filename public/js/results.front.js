/**
 * Created by Remi on 24/01/2017.
 */
var socket = io.connect('http://localhost:3000');
var charts = [];

$(document).ready(function () {
    // nom de la room
    var roomName = $('#dataRoom').data('roomName');
    // Ensemble des requêtes reçu par la room
    var submissions = []
    // Connection à la room
    socket.emit("roomConnect", {room: roomName, name: 'admin'});

    // Abonnement aux nouveaux résultats
    socket.on("newSubmission", function (entry) {
        console.log(entry);


        var userSubmissions = []
        userSubmissions = submissions.filter(function (submission) {
            return submission.user == entry.user
        });

        if(userSubmissions.length > 0) {
            var lastSubmission = userSubmissions[userSubmissions.length -1];
            updateData(lastSubmission.questionId, lastSubmission.responseId, -1);
            updateData(entry.questionId, entry.responseId, +1);
        } else {
            updateData(entry.questionId, entry.responseId, +1);
        }
        submissions.push(entry);
    });


    var updateData = function (idQuestion, idReponse, operator) {
        var question = $('#question-' + idQuestion).find('.json').data('json');

        // Tableau de conversion idReponse => index Chart
        var arrRef = [];

        // Construction du tablaeu de conversion
        for(i=0; i < question.reponses.length; i++ ) {
            arrRef[question.reponses[i].id] = i;
        }

        var idValue = arrRef[idReponse];
        if(operator < 0) {

            charts[idQuestion].data.datasets[0].data[idValue]--;
        } else {

            charts[idQuestion].data.datasets[0].data[idValue]++;
        }
        charts[idQuestion].update();
    };


    $('.charts').each(function (index, chart) {

        var question = $('#question-' + chart.dataset.questionId).find('.json').data('json');


        var dataReponses = [];
        for(i = 0; i < question.reponses.length; i++) {
            dataReponses[i] = 0 ;
        }


        console.log(dataReponses);

        var data = {

            // Labels
            labels: question.reponses.map(function (reponse) {
                return reponse.intitule
            }),

            datasets: [
                {
                    data: dataReponses,
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
        }

        var myPieChart = new Chart($(this), {
            type: 'pie',
            data: data
        });

        charts[$(this).data('questionId')] = myPieChart;
    });

    $('.toggleButton').change(function () {

        if (this.checked) {

            socket.emit("displayQuestionToRoom", {questionId: this.dataset.questionId, room: roomName});

        } else {

            socket.emit("hideQuestionToRoom", {questionId: this.dataset.questionId, room: roomName});
        }
    })

});