const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const path = require('path');
//const nocache = require('nocache');
const session = require('express-session');
const app = express();
require('dotenv').config();
require('./models/dbConfig');





//Authorization CORS ORIGIN
// Middleware Header pour contourner les erreurs en débloquant certains systèmes de sécurité CORS, afin que tout le monde puisse faire des requetes depuis son navigateur
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});




//Autoriser les requêtes aux formats JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 3600000 // validate in 1h/ 
    }
}));

app.use((req, res, next) => {
    console.log(req.session);
    next();
})


//Sécurisé l' application contre certaines des vulnérabilité.
app.use(helmet());
//app.disable('x-powered-by');

//Disable browser cache 
//app.use(nocache())

//API Routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes)


module.exports = app;