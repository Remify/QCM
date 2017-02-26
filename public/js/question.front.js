$(function() {

    // New Question
    $('#addResponseButton').click(function () {

        var clone = $('.reponse').last().clone();
        var nbRep = parseInt(clone.children('input.repIntitule').attr('data-nb-rep')) + 1;
        clone.children('input').attr('data-nb-rep', nbRep);
        // Edition du nouvel input
        clone.find('span').text(nbRep);

        // MAJ des ancienne valeurs
        clone.children('input.repIntitule').attr('id', '');
        clone.children('input.repIntitule').attr('name', 'new');
        clone.children('input.isTrue').attr('name', 'new');
        clone.children('input.isTrue').attr('id', '');
        clone.children('input.idInputHidden').attr('name', '');
        clone.children('label').attr('for', '');

        clone.appendTo('.reponses');
    });
    
    $('.deleteReponse').click(function () {
        $('#hiddenDeleteReponse').val($(this).data('rid'));
        $('#deleteReponse').submit();

        return false;
    })


});
