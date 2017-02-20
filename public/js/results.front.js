/**
 * Created by Remi on 24/01/2017.
 */
var socket = io.connect('http://localhost:3000');
var charts = [];

$(document).ready(function () {
    var roomName = $('#dataRoom').data('roomName');

    socket.on("newSubmission", function (data) {
        console.log(data);
        updateData(data.questionId, data.responseId);
    });


    socket.emit("roomConnect", {room: roomName, name: 'admin'});


    var updateData = function (idQuestion, idReponse) {


        var question = $('#question-' + idQuestion).find('.json').data('json');
        var arrRef = [];

        for(i=0; i < question.reponses.length; i++ ) {
            arrRef[question.reponses[i].id] = i;
        }

        var idValue = arrRef[idReponse];
        console.log(idValue);
        charts[idQuestion].data.datasets[0].data[idValue]++;
        console.log(charts[idQuestion].data.datasets[0].data);
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

        }
    })

});