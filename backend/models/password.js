const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
    .is().min(8)                                                    // Doit contenir minimum 8 caractères
    .is().max(30)                                                 // Doit contenir maximum  30 caractères
    .has().uppercase()                                           // Doit contenir des majuscules
    .has().lowercase()                                           //Doit contenir des minuscules
    .has().digits()                                             //  Doit avoir au moins un chiffre
    .has().not().spaces()                                      // Ne doit pas avoir d'espaces
    .is().not().oneOf(['Passw0rd', 'Password123']);             //Black list des valeurs à proscrire

module.exports = passwordSchema;