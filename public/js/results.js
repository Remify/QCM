/**
 * Created by Remi on 24/01/2017.
 */
var socket = io.connect('http://localhost:3000');

$(document).ready(function () {

    socket.on("newSubmission", function (data) {
        console.log(data);
        updateData(data.responseId);
    });

    var updateData = function(idR) {
        idR--;

        console.log();
        myPieChart.data.datasets[0].data[idR]++ ;
        myPieChart.update();
    };

    var data = {
        labels: [
            "Reponse 1",
            "Reponse 2",
            "Reponse 3"
        ],
        datasets: [
            {
                data: [0, 0, 0],
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

    var ctx = document.getElementById("myChart");
    var myPieChart = new Chart(ctx,{
        type: 'pie',
        data: data
    });
    console.log(myPieChart);
});