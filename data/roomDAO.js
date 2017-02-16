var connection = require('./database');


var RoomDAO = {
    execute: function (query, callback) {

        connection.query(query, function (error, results, fields) {
            if (error) throw error;
            callback(results, fields);
        });
    },

    getAll: function (callback) {
        var query = "SELECT * from rooms"
        
        this.execute(query, function (results, fields) {
            console.log(results);
            callback(results);
        });
    }
}



module.exports = RoomDAO;
