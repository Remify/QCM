var express = require('express');
var router = express.Router();

router.get('/:room/:id', function(req, res, next) {
    res.render('layout');
});

module.exports = router;
