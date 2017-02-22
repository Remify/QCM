var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socket_io    = require('socket.io');
var engine = require('ejs-locals');
var index = require('./routes/index');
var results = require('./routes/results');
var room = require('./routes/room');
var admin = require('./routes/admin');

var app = express();
var server = require('http').Server(app);


// use ejs-locals for all ejs templates:
app.engine('ejs', engine);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


// RoomsState service
var RoomsState = require('./services/rooms-state.service');

// Socket IO
var io = require("./services/sockets")(server, RoomsState);


// Midleware pour Socket.io
app.use(function(req, res, next){
    res.io = io;
    next();
});



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Gestion des assets
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/results', results);
app.use('/room', room);
app.use('/admin', admin);


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
