/**
 * Created by bouguerr on 08/02/2017.
 */
var connection = require('./database');
var Question = require('./question');


var QuestionDAO = {
    execute: function (query, callback) {

        connection.query(query, function (error, results, fields) {
            if (error) throw error;
            callback(results, fields);
        });


    },
    retrieveById: function(id, callback) {
            var query = "SELECT question.id as qId, question.intitule as qIntitule, reponse.id as rId, reponse.intitule as rIntitule FROM question, reponse WHERE question.id =" + id + " AND question_id = " + id;
            this.execute(query, function (results, fields) {
                console.log(query);
                if(results[0]) {
                    var q = new Question(results[0].qId, results[0].qIntitule);
                    results.forEach(function (result) {
                        var reponse = {
                            id: result.rId,
                            intitule: result.rIntitule
                        };
                        q.reponses.push(reponse);
                    })
                }
                callback(q);

            })
    },

    retrieveByRoomId: function(id, callback) {

    },

    /**
     * Enregistre une nouvelle question. Retourne l'id de la question créé
     * Retourne
     * @param qIntitule
     * @param callback
     */
    newQuestion : function (qIntitule, callback) {
        var query = connection.query('INSERT INTO question SET intitule=?', qIntitule, function (error, results, fields) {
            if (error) throw error;
            callback(results.insertId);
        });

    },


    newReponse : function (rIntitule, qId, callback) {

        var reponse = { id: null, intitule: rIntitule, question_id:qId };
        var query = connection.query('INSERT INTO reponse SET ?', reponse, function (error, results, fields) {
            if (error) throw error;
        });
        console.log(query.sql);
    }
}


module.exports = QuestionDAO;