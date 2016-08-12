var express = require('express');
var router = express.Router();

var usersController = require('../controllers/users');
var authController = require('../controllers/auth');

// users resource paths:
router.get('/users', authController.verify, usersController.index);
router.get('/users/:id', authController.verify, usersController.show);
router.get('/post', authController.verify, usersController.post);

// login and register routes
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;