var connection = require('./database');


var RoomDAO = {
    execute: function (query, callback) {

        connection.query(query, function (error, results, fields) {
            if (error) throw error;
            callback(results, fields, error);
        });
    },

    getAll: function (callback) {
        var query = "SELECT * from rooms"
        
        this.execute(query, function (results, fields) {
            console.log(results);
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
              console.log(results);
              callback(results, error);
          });

          console.log('remove');
    },

    addQuestions: function(roomId, questionsId, callback) {
        var query =  "INSERT INTO room_questions VALUES "

        /**
         * i = order
         */
        for(i=0; i < questionsId.length; i++) {
            if(i == questionsId.length -1) {
                query += "( null, '" + roomId + "', '" + questionsId[i] + "', '" + i + "')";
            } else {
                query += "( null, '" + roomId + "', '" + questionsId[i] + "', '" + i + "'),";
            }
        }

        console.log(query);

        this.execute(query, function (results) {
            callback(results);
        });
    }
}



module.exports = RoomDAO;
