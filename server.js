var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

// load the env vars
require('dotenv').load();

// create the Express app
var app = express();

// connect to the MongoDB with mongoose
mongoose = require('./config/database');

// configure passport
require('./config/passport');

// require our routes
var routes = require('./config/routes');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
require('ejs').delimiter = '$';

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
// mount the session middleware
app.use(session({
  secret: 'WDIRocks!',
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('notsosecretnowareyou'));
// you can now write css in scss files!
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false,
  sourceMap: false
}));

//mount passport middleware
app.use(passport.initialize());
app.use(passport.session());

// mount all routes with appropriate base paths
app.use('/', routes);

// invalid request, send 404 page
app.use(function(req, res) {
  res.status(404).send('Cant find that!');
});

module.exports = app;
