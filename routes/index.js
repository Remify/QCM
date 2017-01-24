var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.io.emit("socketToMe", "Hello world");
    res.render('index', {title : "Hello"});
});


module.exports = router;

