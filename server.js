var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./config/routes');


var PORT = process.env.PORT || 3000;
var DATABASE = process.env.MONGOLAB_URI || 'mongodb://localhost/national-humane-society-app';

mongoose.connect(DATABASE, function(err, res) {
	if (err) console.log(`error connecting to ${DATABASE}. ${err}`);
})
var app = express();


app.use(bodyParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.listen(PORT, function() {
	console.log(`listening on port ${PORT}`);
})