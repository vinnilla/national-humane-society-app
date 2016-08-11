var mongoose = require('mongoose');

var userSchema= new mongoose.Schema({
	email: String,
	password_hash: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;