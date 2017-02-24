
var connection = require('./database');

var NiveauDAO = {
    execute: function (query, callback) {

        connection.query(query, function (error, results, fields) {
            if (error) throw error;
            callback(results, fields);
        });


    },

    getAll: function (callback) {
        var query = "SELECT * FROM niveau"
        this.execute(query, function (results, fields) {
            callback(results)
        })
    },

    update: function (id, intitule, callback) {
        connection.query("UPDATE niveau SET intitule = ? WHERE id = " + id, intitule, function (error, results, fields) {
            if (error) throw error;
            callback(results, fields);
        });
    },

    new: function (intitule, callback) {
        var niveau = {id: null, intitule:intitule}

        var query = connection.query('INSERT INTO niveau SET ?', niveau, function (error, results, fields) {

            if (error) throw error;
            callback(results)
        });
    },


    delete: function(id, callback){
        var query = "DELETE FROM niveau WHERE id = " + id ;
        this.execute(query, function (results) {
            callback(results);
        })
    },
}

module.exports = NiveauDAO;