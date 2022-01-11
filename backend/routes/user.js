const express = require('express');
const router = express.Router();
const checkMail = require('../middleware/checkMail');
const checkPass = require('../middleware/checkPass');
const userCtrl = require('../controllers/userCtrl');




//Users Routes
router.post('/signup', checkMail, checkPass, userCtrl.signUp);
router.post('/login', userCtrl.login);


module.exports = router;