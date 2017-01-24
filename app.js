var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socket_io    = require('socket.io');

var index = require('./routes/index');
var results = require('./routes/results');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Midleware pour Socket.io
app.use(function(req, res, next){
    res.io = io;
    next();
});

// TODO : Organiser les communications par socket
io.sockets.on('connection', function (socket) {

    // Quand le serveur reçoit un signal de type "inputQuestion" du client
    socket.on('inputQuestion', function (data) {

        console.log(data);
        // io.emit pour envoyer à tout le monde
        io.emit('newSubmission', data);
    });

});

var sendToResult = function($data) {

}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Gestion des assets
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/results', results);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {app: app, server: server};
