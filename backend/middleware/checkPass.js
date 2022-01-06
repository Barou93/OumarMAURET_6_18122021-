const passwordValidator = require('../models/password');

module.exports = (req, res, next) => {
    if (!passwordValidator.validate(req.body.password)) {
        res.status(401).json({
            message: `Le mot de passe doit faire au minimum 
            8 caractères, avec une maj, une minuscule et 1 chiffre au moins`})
    } else {
        next();
    }
}
