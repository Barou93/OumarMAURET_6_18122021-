const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
require('dotenv').config();


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({
        email: req.body.email,
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
                    const newToken = jwt.sign(
                        { userId: user._id },
                        process.env.TOKEN_KEY,
                        { expiresIn: '1h' }
                    );
                    //req.session.token = newToken; //Send token in the session and create a new cookies

                    res.status(200).json({
                        userId: user._id,
                        token: newToken //Add the new user token in the frontend
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }))
};