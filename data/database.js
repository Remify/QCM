var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'qcm_nodejs',
    port:''
});

module.exports = connection;