var express = require('express');
var router = express.Router();
const authentic = require('../middleware/auth-middleware')
const UserController = require('../controller/user-controller')

/* GET home page. */
router.get('/',authentic,UserController.getUser);
router.post('/login',UserController.login);
router.post('/register',UserController.register);

module.exports = router;
