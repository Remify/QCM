$(function() {

    // Edit question
    $(".Values").click(function() {
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


    /** Vue niveau **/
    $('.niveau h2').click(function () {
        $(this).hide()
        $('#inputIntitule').attr('type', 'text').show().focus()
        $('.niveau .fa').text('Appuyez sur entrée pour enregistrer')
    })

    $('#inputIntitule').blur(function () {
        $(this).hide();
        $('.niveau h2').show();
        $('.niveau .fa').text('Cliquez sur le titre pour modifier l\'intitulé du niveau')
    })


    /** Vue Matière **/
    $('.matiere h2').click(function () {
        $(this).hide()
        $('#inputIntitule').attr('type', 'text').show().focus()
        $('.niveau .fa').text('Appuyez sur entrée pour enregistrer')
    })

    $('#inputIntitule').blur(function () {
        $(this).hide();
        $('.matiere h2').show();
        $('.niveau .fa').text('Cliquez sur le titre pour modifier l\'intitulé de la matière')
    })

    // New Question
    $('#addResponseButton').click(function () {
        var clone = $('.reponse').last().clone();
        var nbRep = parseInt(clone.children('input').attr('data-nb-rep')) + 1;
        clone.children('input').attr('data-nb-rep', nbRep);
        clone.find('span').text(nbRep);
        clone.appendTo('.reponses');
    });

    // Recherche sur la vue rooms
    $('#roomsSearch').keyup(function () {
        var search = this.value;

        $('.roomElement a').each(function () {
            console.log($(this).text().search(search));
            if($(this).text().search(search) < 0) {
                $(this).parent('li').first().hide();
            } else {
                $(this).parent('li').first().show();
            }
        })
    })

    // Room Sortable
    if($('#roomQuestions').length > 0) {


        // Recherche
        $('#searchQuestions').tooltip();
        $('#searchQuestions').keyup(function () {

            var search = this.value.toLowerCase();

            $('#allQuestions').children('div').each(function () {

                if($(this).text().toLowerCase().search(search) >= 0
                    || $(this).data('matiere').toLowerCase().search(search) >= 0
                    || $(this).data('niveau').toLowerCase().search(search) >= 0
                    ) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            })
        })

        $( "#roomQuestions, #allQuestions" ).sortable({
            connectWith: ".connectedSortable"
        }).disableSelection();

        // Room submit data
        $('#formRoomQuestions').submit(function(){
            console.log($("#roomQuestions").sortable("toArray"));
            $('#sortableData').val($("#roomQuestions").sortable("toArray"));
            return true;
        });


    }

} );