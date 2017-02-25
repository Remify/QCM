/**
 * Created by Remi on 25/02/2017.
 */

var connection = require('../data/database');
var bcrypt = require('bcrypt-nodejs');

var AuthService = {

    authRequire: function (req, res, next) {
        console.log(req.session)
        if(req.session.loggedIn) {
            next();
        } else {
            res.redirect("/login");
        }
    },
    
    login: function (login, pwd, callback) {

        var query = connection.query('SELECT * FROM user WHERE login = ? ', [login],function (error, results, fields) {
            if (error) throw error;

            if(results.length > 0 ) {

                if(bcrypt.compareSync(pwd, results[0].password)) {
                    console.log('in')
                    callback({code:200 })
                } else {
                    callback({code:401, message: 'Erreur d\'authentification'})
                }
            } else {
                callback({code:401, message: 'Erreur d\'authentification'})
            }
        });
    }
}



module.exports = AuthService;