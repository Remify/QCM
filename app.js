// Base de l'application
var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session')

//
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


// Template engine pour ejs
var engine = require('ejs-locals');

// Routes
var index = require('./routes/index');
var room = require('./routes/room');
var admin = require('./routes/admin');

// Session Middleware - Temps de la session 2h
app.use(session({
    secret: 'qcmSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 7200000 }
}))

// Services et Middlewares
var AuthService = require('./services/auth.service')
var server = require('http').Server(app);


// use ejs-locals for all ejs templates:
app.engine('ejs', engine);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Middleware pour

// Middleware pour Auth aux pages admin
app.all("/admin*", AuthService.authRequire, function(req, res, next) {
    // Si le midleware nous à autorisé, nous continuons
    next();
});

// RoomsState service
var RoomsState = require('./services/rooms-state.service');

// Socket IO Middleware
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


// Appel des routes
app.use('/', index);
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
