var express = require('express');
var router = express.Router();

var AuthService = require('../services/auth.service')

/* GET home page. */
router.get('/', function(req, res, next) {
        res.render('index');
});

router.get('/login', function(req, res, next) {
    res.render('admin/login');
});

router.post('/login/connect', function (req, res, next) {

    AuthService.login(req.body.login, req.body.password, function (callback) {

        if(callback.code == 200) {
            req.session.loggedIn = true;
            console.log(req.session)
            res.redirect('/admin/')
        } else {
            req.session.loggedIn = false
            res.redirect('/login?code=' + callback.code)
        }

    });
})


module.exports = router;

