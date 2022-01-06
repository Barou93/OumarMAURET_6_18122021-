const express = require('express');
const sauceRouter = express.Router();
const sauceCtrl = require('../controllers/sauceCtrl');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const validation = require('../middleware/sauceValidator');

//Sauces Routes

sauceRouter.post('/', auth, multer, validation, sauceCtrl.createSauce);
sauceRouter.put('/:id', auth, multer, validation, sauceCtrl.modifyOneSauce);
sauceRouter.delete('/:id', auth, sauceCtrl.deleteOneSauce);
sauceRouter.get('/:id', auth, sauceCtrl.getOneSauce);
sauceRouter.get('/', auth, sauceCtrl.getAllSauces);
sauceRouter.post('/:id/like', auth, sauceCtrl.addLikesAndDislikes);

module.exports = sauceRouter;