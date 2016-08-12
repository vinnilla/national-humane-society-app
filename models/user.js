var mongoose = require('mongoose');

var userSchema= new mongoose.Schema({
	email: String,
	password_hash: String,
	name: String,
	address: String,
	city: String,
	state: String,
	zip: Number,
	preferred_animal: String,
	googleId: String,
	created: {type: Date, default: Date.now}
});

var User = mongoose.model('User', userSchema);

module.exports = User;