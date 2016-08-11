var express = require('express');
var router = express.Router();

var userController = require('../controllers/users');
var authController = require('../controllers/auth');

// user
router.get('/users', authController.verify, userController.index);
router.get('/users/:id', authController.verify, userController.show);

// authentication
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;