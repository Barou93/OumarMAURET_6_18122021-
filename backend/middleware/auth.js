const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    ;
    try {
        // récupération du jwt dans le cookie de session
        req.session.token = req.headers.authorization.split(' ')[1];
        const token = req.session.token;
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decodedToken.userId;
        //Recupérer l'id auth de l'utilisateur
        req.auth = { userId };

        if (req.body.userId && req.body.userId !== userId) {
            throw 'UserId non valide !';
        } else {
            next();
        }

    } catch (error) {
        res.status(401).json({ error: error || 'Requête non authentifiée !' })
    }
}