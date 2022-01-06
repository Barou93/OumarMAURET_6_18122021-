const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/userCtrl');
const checkMail = require('../middleware/checkMail');
const checkPass = require('../middleware/checkPass');


//Users Routes
router.post('/signup', checkMail, checkPass, userCtrl.signup);
router.post('/login', userCtrl.login);


module.exports = router;