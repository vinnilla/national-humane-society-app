var User = require('../models/user')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

var saltRounds = 10

function login (req, res, next) {
	// 1. Validate email and password
	var email = req.body.email
	var password = req.body.password

	if (!email || !password) {
		res.json({ error: "Email and password must be set" })
	}
	else {
		// Verify that email exists
		User.findOne({ email: email }, function (err, user) {
			if (err) console.log(err)
			if (!user) {
				res.json({ error: "User does not exist" })
			}
			else {
				// 2. Compare password
				bcrypt.compare(password, user.password_hash, function(err, result) {
				    if (err) console.log(err)
				    if (!result) {
				    	res.json({ error: "Invalid password"})
				    }
				    else {
				    	// 3. Return a token
				    	var token = jwt.sign({ user: user._id }, process.env.JWT_SECRET);
				    	res.json({ token: token, id: user._id })
				    }
				});
			}
		})
	}
}

function register (req, res, next) {
	// 1. Validate email and password
	var email = req.body.email
	var password = req.body.password

	if (!email || !password) {
		res.json({ error: "Email and password must be set" })
	}

	// Verify user has not already registered
	User.findOne({ email: email }, function (err, user) {
		if (err) console.log(err)

		// should return null
		if (user) {
			res.json({ error: "User email already exists" })
		}
		else {
			bcrypt.hash(password, saltRounds, function(err, hash) {
				if (err) console.log(err)
				var user = new User({
					email: email,
					password_hash: hash
				});
				user.save(function (err, user) {
					if (err) console.log(err)
					res.json({ msg: user.email + " registered"})
				})
			});
		}
	})
}

function verify(req, res, next) {
	var token =  req.query.token
	jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
		if (err) res.json(err)
		else {
			req.token = decoded
			next()
		}
	});
}

function verifyAdmin(req, res, next) {
	var token =  req.query.token
	jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
		if (err) res.json(err)
		else if (!req.token.admin) {
			res.json({error: "Not an admin"})
		}
		else {
			req.token = decoded
			next()
		}
	});
}

module.exports = {
	login: login, 
	register: register,
	verify: verify
}