var User = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var saltRounds = 10;

function login(req, res, next) {
	// 1. validate email and password
	var email = req.body.email
	var password = req.body.password

	if (!email || !password) {
		res.json({error: "Email and password must be set"})
	}
	else {
		// verify user exists
		User.findOne({email: email}, function(err, user) {
			if (err) console.log(err);
			if (!user) {
				res.json({error: "User does not exist"});
			}
			else {
				// 2. compare passwords
				bcrypt.compare(password, user.password_hash, function(err, result) {
					if (err) console.log(err);
					if (!result) {
						res.json({error: "Invalid password"})
					}
					else {
						// 3. return token
						var token = jwt.sign({user: user._id}, process.env.JWT_SECRET);
						res.json({token: token});
					}
				})
			}
		})
	}
}

function register(req, res, next) {
	// 1. validate email and password
	var email = req.body.email
	var password = req.body.password

	if (!email || !password) {
		res.json({error: "Email and password must be set"})
	}

	// verify user has not already registered
	User.findOne({email: email}, function(err, user) {
		if (err) console.log(err);
		// should return null
		if (user) {
			res.json({error: "User email already exists"})
		}
		else {
			// 2. hash password
			bcrypt.hash(password, saltRounds, function(err, hash) {
				if (err) console.log(err);
				// store new user in db
				var user = new User({
					email: email,
					password_hash: hash
				});
				// 3. save
				user.save(function(err, user) {
					if (err) console.log(err);
					res.json(user);
				})
			});
		}
	})
}

function verify(req, res, next) {
	var token = req.query.token
	var decoded = jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
		if (err) res.json(err);
		else {
			req.token = decoded;
			next()
		}
	});

}

module.exports = {
	login: login,
	register: register,
	verify: verify
}