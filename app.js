var vkApi = require('vk-dirty-api');
var fs = require('fs');
var util = require('util');
var nconf = require('nconf');
var request = require('request');

var express = require('express');
var stylus = require('stylus');
var autoprefixer = require('autoprefixer-stylus');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var vkfun = require('./lib/functions.js');

nconf.use('file', { file: './config.json' });
nconf.load();

var credentials = {
    client_id: nconf.get('idpri'),
    login:     nconf.get('login'),
    pass:      nconf.get('pass'),
};

var vk = new vkApi(
    credentials,
    function (err, access_token) {
        if(err)
            return console.error('Unable to authenticate', err);
        console.log('Successfully authenticated / access_token:', access_token);
});

app.get('/settings', function(req, res) {
    res.render('settings.jade', {
        password: nconf.get('pass'),
        login: nconf.get('login'),
        app: nconf.get('idpri'),
        title: "Settings"
    });
});

app.use(stylus.middleware({
  src: path.join(__dirname, 'public'),
  compile: function(str, path) {
    return stylus(str)
      .use(autoprefixer())   // autoprefixer
      .set('filename', path) // @import
      .set('compress', true) // compress
    ;
  }
}));

app.use(express.static(__dirname + '/public'));

function checkonline(){
  var interval = setInterval( function() {
  vkfun.getonline1();
}, 60000);
};

checkonline();
var text112 = fs.readFileSync('online.file','utf8')

app.get('/tests', function(req, res) {
    res.render('tests.jade', {
        online: text112,
        title: "Tests"
    });
});

app.get('/searchingvk', function(req, res){
var val = req.query.search;
vk.api('wall.get', {
    owner_id: val,
    count: 5
  }, function(err, info) {
   if(err)
    return console.error('Unable to complete request', err);
    res.send(info);
  console.log(info);
  });
});

/*
app.get('/search2ch', function(req, res){
request({
    url: data,
    json: true
}, function (error, response, body) {
  console.log(body+response+error);
    if (!error && response.statusCode === 200) {

    }
});
});
*/


vk.on('error', function (err) {
    // do authentication fail related stuff...
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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



module.exports = app;
