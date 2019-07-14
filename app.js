
// set this variable to true to enable twitter functionality
global.twitterActive = false;
global.locked = false;

const microInstance = true;

var express = require('express');
//var reload = require('reload');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var io = require('socket.io')();

var fs = require('fs');
var request = require('request');


var routes = require('./routes/index');
var all = require('./routes/all');
var one = require('./routes/one');
var feed = require('./routes/feed');

var app = express();
process.env.MODE = "live";


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));
app.use('/static', express.static('public'));

app.use('/', routes);
app.use('/all', all);
app.use('/one', one);
app.use('/feed', feed);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// setup server
//app.set('port', process.env.PORT || 4000);
app.set('port', 8080);
server = app.listen(app.get('port'), function() {
  console.log("server listening on port " + app.get('port'));
});

io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('some event', { for: 'everyone' });
});

// Add a disconnect listener
io.on('disconnect',function() {
  console.log('The client has disconnected!');
});

//reload(server, app);

module.exports = app;
