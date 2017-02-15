var express = require('express');
var router = express.Router();

router.get('/:room/:id', function(req, res, next) {


    console.log(res.io.of("/").connected[req.params.id].rooms);
    res.render('room', {room: req.params.room} );
});

module.exports = router;
