const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const limiter = require('../middleware/limiter');
const validatorEmail = require('../middleware/validatorEmail');
const validatorPassword = require('../middleware/validatorPassword');

router.post('/signup', validatorEmail, validatorPassword, userCtrl.signup);
router.post('/login', limiter.limiter, userCtrl.login);
router.get('/logout', userCtrl.logout);
router.get('/:id', userCtrl.userInfo);

module.exports = router;