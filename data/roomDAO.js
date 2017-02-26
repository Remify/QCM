var connection = require('./database');


var RoomDAO = {
    execute: function (query, callback) {

        connection.query(query, function (error, results, fields) {
            if (error) throw error;
            callback(results, fields, error);
        });
    },

    // Création d'une room
    create: function (name, callback){
        var query = connection.query('INSERT INTO rooms SET name = ?', name, function (error, results, fields) {
            if (error) throw error;
            callback(results);
        });
    },

    // Suppresion d'une room
    delete: function (id, callback) {

        // Suppressions des questions associés
        this.removeQuestions(id, function () {
            
        });

        var query = "DELETE FROM rooms WHERE id = " + id;

        this.execute(query, function (results, error) {
            callback(results, error);
        });

    },

    getAll: function (callback) {
        var query = "SELECT * from rooms"
        
        this.execute(query, function (results, fields) {
            callback(results);
        });
    },

    retrieveById: function(id, callback) {
        var query = "SELECT * FROM rooms WHERE id = " + id;
        this.execute(query, function (results) {
            callback(results);
        });
    },

    retrieveByName: function(name, callback) {
        var query = "SELECT * FROM rooms WHERE name LIKE '" + name + "'";
        this.execute(query, function (results) {
            callback(results[0]);
        });
    },
    
    removeQuestions: function (roomId, callback) {
          var query = "DELETE FROM room_questions WHERE room_id = " + roomId;

          this.execute(query, function (results, error) {
              callback(results, error);
          });

    },

    addQuestions: function(roomId, questionsId, callback) {
        var query =  "INSERT INTO room_questions VALUES "

        /**
         * i = order
         */
        for(var i=0; i < questionsId.length; i++) {
            if(i == questionsId.length -1) {
                query += "( null, '" + roomId + "', '" + questionsId[i] + "', '" + i + "')";
            } else {
                query += "( null, '" + roomId + "', '" + questionsId[i] + "', '" + i + "'),";
            }
        }

        this.execute(query, function (results) {
            callback(results);
        });
    }
}



module.exports = RoomDAO;
