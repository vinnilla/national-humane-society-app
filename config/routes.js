var router = require('express').Router();
var passport = require('passport');

var usersController = require('../controllers/users');
var authController = require('../controllers/auth');
var shelterController = require('../controllers/shelters');

// The root route renders our only view
router.get('/', function(req, res) {
  res.render('index', { user: req.user, google_map_key: process.env.GOOGLE_MAPS_KEY, shelter: req.shelter });
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
router.get('/shelters', shelterController.index);
router.get('/shelters/:id', shelterController.show);
router.post('/users/:user_id/shelters', shelterController.create);
router.patch('/shelters/:id', shelterController.update);
router.delete('/shelters/:id', shelterController.delete);

router.patch('/shelters/:id/pet', shelterController.newpet);
router.get('/shelters/:id/pets', shelterController.showpets);
router.get('/shelters/:shelter_id/pets/:id', shelterController.showpet);
router.patch('/shelters/:shelter_id/pets/:id', shelterController.editpet);
router.delete('/shelters/:shelter_id/pets/:id', shelterController.deletepet);


module.exports = router;
