var router = require('express').Router();
var passport = require('passport');

var usersController = require('../controllers/users');
var authController = require('../controllers/auth');
var shelterController = require('../controllers/shelters');

// The root route renders our only view
router.get('/', function(req, res) {
  res.render('index', { user: req.user });
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate('google',
	{ scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate('google',
	{
    successRedirect : '/',
    failureRedirect : '/'
  }));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// users resource paths:
router.get('/users', usersController.index);
router.get('/users/:id', usersController.show);
router.patch('/users/:id', usersController.update);
router.delete("/users/:id", usersController.delete);

// login and register routes
router.post('/login', authController.login);
router.post('/register', authController.register);

// shelter
router.get('/shelter', shelterController.index);
router.get('shelter/:id', shelterController.show);
router.post('/shelter', shelterController.create);
router.patch('/shelter/:id', shelterController.update);
router.delete('/shelter/:id', shelterController.delete);

module.exports = router;