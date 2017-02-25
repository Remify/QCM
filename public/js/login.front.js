/**
 * Created by Remi on 25/02/2017.
 */


$(document).ready(function() {

    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    }

    if($.urlParam('code') == "401") {

        $('#alertAuth b').text('Erreur à l\'authentification :/')
        $("#alertAuth").dialog();

    }

});