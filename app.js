"use strict";
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var userController = require('./routes/controllers/api/user/userController');
var userModel = require('./models/user').users;

var app = express();

function perimitirCrossDomain(req, res, next) {
res.header('Access-Control-Allow-Credentials', true);
res.header('Access-Control-Allow-Origin',  '*');
res.header('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');
res.header ('Access-Control-Allow-Headers', 'Content-Type');
next();
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(perimitirCrossDomain);
app.use(logger('dev'));
app.use(bodyParser.json({type:'*/*'}));
app.use(bodyParser.urlencoded({ extended : true }));   
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/prueba',function(req, res){
  console.log(userModel);
  userModel.create({
    user:'mbetin',
    password:'123456',
    name:{
      first:'maria',
      last:'betin'
    }
  }, function(error, user){
    if(error){
      console.log('mas..');
      res.send({error:error});
    }else{
      res.send({user:user});
    }
  });
});

app
  .route('/user')
  .post(userController.addUser)
  .get(userController.getUsers);
app
  .route('/user/:id')
  .get(userController.getUserById);


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
