$(function() {

    // Edit question
    $(".qValues").click(function() {
        var input = $("<input>", { val: $(this).text().trim(),
            type: "text", id:"updatedValue"});

        var p = $(this).find("p").clone();
        $(this).find("p").replaceWith(input);

        input.focus();
        var celuici = $(this);
        input.blur(function () {
            //On remplace l'ancien intitulé de la question par le nouveau s'il n'est pas vide
            if($("#updatedValue").val().trim() != ""){
                p.html($("#updatedValue").val().trim());    //sur l'affichage de la question
            }
            input.replaceWith(p);
            console.log(celuici.find("input[id^='qValue']").val());
            celuici.find("input[id^='qValue']").attr('value', (celuici.find("p").text().trim())) ; //dans l'input hidden qui sert au formulaire
        })
    });



    // New Question
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