const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const cryptoJs = require('crypto-js');
require('dotenv').config();


exports.signup = (req, res, next) => {
    const encryptEmail = cryptoJs.SHA512(req.body.email, process.env.ENCRYPT_KEY).toString(cryptoJs.enc.Base64);
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: encryptEmail,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    const encryptEmail = cryptoJs.SHA512(req.body.email, process.env.ENCRYPT_KEY).toString(cryptoJs.enc.Base64);
    User.findOne({
        email: encryptEmail,
    })
        .then(user => {
            if (!user) {
                return res.status(401).json({ Error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ Error: 'Votre mot de passe est erroné !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.TOKEN_KEY,
                            { expiresIn: '24h' }
                        ) //Add the new user token in the frontend
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }))
};