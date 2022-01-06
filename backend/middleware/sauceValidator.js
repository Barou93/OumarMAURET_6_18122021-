const validate = require('mongoose-validator');

//Regex pour vérifier que l'utilisation utilise uniquement des chiffres ou soit des lettres
const pattern = /^[a-z\d\-_\s]+$/i;

module.exports = (req, res, next) => {

    //For Post ROUTES
    if (JSON.parse(req.body.sauce !== undefined)) {
        const sauce = JSON.parse(req.body.sauce);
        let { name, manufacturer, description, mainPepper } = sauce;

        //Stocker la valeur des données saisies par User dans le tableau
        let userInput = [];

        const checkUserPost = (...inputs) => {
            //Enlève les spaces dans les inputs du formulaire avec la methode trim()
            userInput = inputs.map((input) => input.trim());
        }
        checkUserPost(name, manufacturer, description, mainPepper);
        //Check if user input  is => 3
        const hasThreeCharactersLength = (value) => value.length >= 3;
        if (userInput.every(hasThreeCharactersLength)) {
            next();
        } else {
            //throw new Error('Le nom doit comporter au moins 3 caractères');
            res.status(401).json({ message: 'Le nom doit comporter au moins 3 caractères' });
        }
    } else {
        //For PUT ROUTES
        const sauce = req.body;
        let { name, manufacturer, description, mainPepper } = sauce;
        let userInput = [];
        const checkUserUptade = (...inputs) => {
            //Delete space to user input field
            userInput = inputs.map((input) => input.trim());
        }
        checkUserUptade(name, manufacturer, description, mainPepper);
        const hasThreeCharactersLength = (value) => value.length >= 3;
        if (userInput.every(hasThreeCharactersLength)) {
            next();
        } else {
            //throw new Error('Le nom doit comporter au moins 3 caractères')
            res.status(401).json({ message: 'Le nom doit être compris entre 3 et 60 caractères' });
        }
    }
}




