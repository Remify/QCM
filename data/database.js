var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'qcm-nodejs',
    port     : '3306'
});

module.exports = connection;