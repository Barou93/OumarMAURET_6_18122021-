
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const { signUpErrors, loginErrors } = require('../utils/errors.utils');
require('dotenv').config();

//la date d'expiration du token
const maxAge = 24 * 60 * 60 * 1000; // Expires pendant 24h

//Générer un token à l'inscription et la connexion d'un User
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};
//Create a new User in the application
module.exports.signUp = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password })
        res.status(201).json({ user: user._id });

    }
    catch (err) {
        const errors = signUpErrors(err);
        res.status(400).json({ errors });
    }
}

//Logging the application User
module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        //Create user Token 
        const token = createToken(user._id);
        //Stock user token in the cookies 
        res.cookie('jwt', token, { httpOnly: true, maxAge });
        res.status(200).json({ userId: user._id, token })
    } catch (err) {
        //Return error display if here is the bad request 
        const errors = loginErrors(err)
        res.status(400).json({ errors });
    }
}
