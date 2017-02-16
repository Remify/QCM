console.log('hello');


// TODO : Suppression
$('#addResponseButton').click(function () {
    var clone = $('.reponse').last().clone();
    var nbRep = parseInt(clone.children('input').attr('data-nb-rep')) + 1;
    clone.children('input').attr('data-nb-rep', nbRep);
    clone.find('span').text(nbRep);
    clone.appendTo('.reponses');
});


$(function() {
    $( "#roomQuestions, #allQuestions" ).sortable({
        connectWith: ".connectedSortable"
    }).disableSelection();
} );