$(function() {

    // New Question
    // TODO : Suppression
    $('#addResponseButton').click(function () {
        var clone = $('.reponse').last().clone();
        var nbRep = parseInt(clone.children('input').attr('data-nb-rep')) + 1;
        clone.children('input').attr('data-nb-rep', nbRep);
        clone.find('span').text(nbRep);
        clone.appendTo('.reponses');
    });

    // Room Sortable
    $( "#roomQuestions, #allQuestions" ).sortable({
        connectWith: ".connectedSortable"
    }).disableSelection();

    // Room submit data
    $('#formRoomQuestions').submit(function(){
        console.log($("#roomQuestions").sortable("toArray"));
        $('#sortableData').val($("#roomQuestions").sortable("toArray"));
        return true;
    });
} );