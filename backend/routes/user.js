const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/userCtrl');


//Users Routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);


module.exports = router;