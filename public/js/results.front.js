/**
 * Created by Remi on 24/01/2017.
 */
var socket = io.connect('http://localhost:3000');
var charts = [];

$(document).ready(function () {

    socket.on("newSubmission", function (data) {
        updateData(data.questionId, data.responseId);
    });

    var updateData = function(idQuestion, idReponse) {

        var index = idReponse - 1;
        console.log('index update : ' + index);

        charts[idQuestion].data.datasets[0].data[index]++;
        charts[idQuestion].update();
    };


    $('.charts').each(function(index, chart) {


        var data = {
            labels: [
                "Reponse 1",
                "Reponse 2",
                "Reponse 3"
            ],
            datasets: [
                {
                    data: Array(parseInt(chart.dataset.reponseNb)).fill(0),
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

        var myPieChart = new Chart($(this),{
            type: 'pie',
            data: data
        });

        charts[$(this).data('questionId')] = myPieChart ;
    });
});