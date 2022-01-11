const Sauce = require('../models/Sauce');
const fs = require('fs');



exports.createSauce = (req, res, next) => {

    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,

        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []

    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Votre sauce a été ajouter avec succès' }))
        .catch(error => res.status(401).json(new Error(error)));

},
    exports.modifyOneSauce = (req, res, next) => {
        let sauceObject = {};
        req.file ? (
            //Si la modification doit prendre en compte l'image
            Sauce.findOne({
                _id: req.params.id
            })
                .then((sauce) => {
                    //Supprimer l'image d'origine 
                    const filename = sauce.imageUrl.split('/images')[1];
                    fs.unlinkSync(`images/${filename}`);
                }),
            sauceObject = {
                //Ajouter la nouvelle image
                ...JSON.parse(req.body.sauce),
                imageUrl: `${req.protocol}://${req.get('host')}/images/
                ${req.file.filename}`,
            }
        ) : (
            //Si la modification ne  prends pas en compte l'image
            sauceObject = {
                ...req.body
            }
        )
        Sauce.updateOne({
            _id: req.params.id
        }, {
            ...sauceObject,
            _id: req.params.id
        }
        )
            .then(() => res.status(200).json({ message: 'Sauce modifié avec succès !' }))
            .catch(err => res.status(400).json(new Error(err)));
    },


    exports.deleteOneSauce = (req, res, next) => {
        Sauce.findOne({
            _id: req.params.id,
        })
            .then(sauce => {
                //Vérifier si le Userid est  !=  du UserId de la sauce à supprimer
                if (sauce.userId !== req.userId) {
                    res.status(401).json(new Error('Not Authorized!'))
                } else {
                    //Si le UserId correspond à celui de la sauce supprimer de la db
                    const filename = sauce.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        Sauce.deleteOne({ _id: req.params.id })
                            .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
                            .catch(error => res.status(400).json(new Error(error)));
                    })
                }
            })
            .catch(err => res.status(500).json(new Error(err)))
    },


    exports.getOneSauce = (req, res, next) => {
        //Verification avec la methode findOne et on passe une comparaison et s'assure que l'id de la sauce est égale a ID de la requête
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => res.status(200).json(sauce))
            .catch(error => res.status(404).json(new Error(error)))

    },
    exports.getAllSauces = (req, res, next) => {
        Sauce.find()
            .then(sauces => res.status(200).json(sauces))
            .catch(error => res.status(404).json(new Error(error)));

    },



    exports.addLikesAndDislikes = (req, res, next) => {
        //Add likes and dislikes values in the sauces
        const likes = req.body.like;
        const userId = req.body.userId;
        const sauceId = req.params.id;
        // If User add likes 
        if (likes === 1) {
            Sauce.updateOne(
                { _id: sauceId },
                {
                    $push: {
                        usersLiked: userId,
                    },
                    $inc: {
                        likes: +1
                    },
                }).then(() => res.status(201).json({ message: `J'aime ajouter avec succès!` }))
                .catch(err => res.status(404).json(new Error(err)));
        }
        if (likes === -1) {
            Sauce.updateOne(
                { _id: sauceId },
                {
                    $push: {
                        usersDisliked: userId
                    },
                    $inc: {
                        dislikes: +1
                    }
                }).then(() => res.status(200).json({ message: `Je n'aime pas ajouter avec succès` }))
                .catch(err => res.status(404).json(new Error(err)));
        }
        if (likes === 0) {
            Sauce.findOne({ _id: sauceId })
                .then(sauce => {
                    //If user cancel likes 
                    if (sauce.usersLiked.includes(userId)) {
                        Sauce.updateOne(
                            { _id: sauceId },
                            {
                                $pull: {
                                    usersLiked: userId
                                },
                                $inc: {
                                    //On incremente de -1
                                    likes: -1
                                }
                            })
                            .then(() => res.status(200).json({ message: 'Likes rétirer avec succès' }))
                            .catch(err => res.status(404).json(new Error(err)))
                    }
                    if (sauce.usersDisliked.includes(userId)) {
                        Sauce.updateOne(
                            { _id: sauceId },
                            {
                                $pull: {
                                    usersDisliked: userId
                                },
                                $inc: {
                                    //On incremente de -1
                                    dislikes: -1,
                                    //dislikes: 1
                                }
                            })
                            .then(() => res.status(200).json({ message: 'Likes rétirer avec succès' }))
                            .catch(err => res.status(404).json(new Error(err)))
                    }
                })
                .catch((error) => res.status(404).json({ error }))
        }


    };



