
var connection = require('./database');

var matiereDAO = {
    execute: function (query, callback) {

        connection.query(query, function (error, results, fields) {
            if (error) throw error;
            callback(results, fields);
        });


    },

    getAll: function (callback) {
        var query = "SELECT * FROM matiere"
        this.execute(query, function (results, fields) {
            callback(results)
        })
    },

    update: function (id, intitule, callback) {
        connection.query("UPDATE matiere SET intitule = ? WHERE id = " + id, intitule, function (error, results, fields) {
            if (error) throw error;
            callback(results, fields);
        });
    },

    new: function (intitule, callback) {
        var matiere = {id: null, intitule:intitule}

        var query = connection.query('INSERT INTO matiere SET ?', matiere, function (error, results, fields) {

            if (error) throw error;
            callback(results)
        });
    },


    delete: function(id, callback){
        var query = "DELETE FROM matiere WHERE id = " + id ;
        this.execute(query, function (results) {
            callback(results);
        })
    },
}

module.exports = matiereDAO;