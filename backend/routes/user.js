const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

const limiter = require('../middleware/limiter');
const validatorEmail = require('../middleware/validatorEmail');
const validatorPassword = require('../middleware/validatorPassword');

router.get('/getUser/:id', auth, userCtrl.userInfo);
router.get('/allUsers', auth, userCtrl.getAllUsers);
router.get('/logout', userCtrl.logout);
router.post('/signup', validatorEmail, validatorPassword, userCtrl.signup);
router.post('/login', limiter.limiter, userCtrl.login);

module.exports = router;