
$(document).ready(function() {
    $('.question').each(function (question) {

        var questionDiv = this;
        $.ajax({ url: '/room/dev/question/' + this.dataset.id + '/getResponses'}).done(function (res) {
            console.log(res);
            res.reponses.forEach(function (reponse) {
                var div = $("<div></div>")
                var radio = $("<input type='radio' name='reponse' data-question-id='" + reponse.id +"'/>" );
                div.append(radio);
                div.append(reponse.intitule);
                $(questionDiv).find('form').first().append(div);
            })
        });


    })
});