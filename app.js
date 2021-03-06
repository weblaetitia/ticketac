var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

var session = require('express-session')

if(!process.env.DB_INFO) {
  require('dotenv').config()
}
// express-session
  app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true }
}))


// routers
var trainsRouter = require('./routes/trains');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// router familys
app.use('/', indexRouter);
app.use('/trains', trainsRouter)

// require models
require('./models/dbconnect')



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

// My functions
app.locals.prettyDate = function(date) {
  var newDate = new Date(date)
  return myDate = newDate.getDate() + '/' + newDate.getMonth()+ '/' + newDate.getFullYear()
}


module.exports = app;
