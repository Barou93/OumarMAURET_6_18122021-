const Sauce = require('../models/Sauce');
const fs = require('fs');





exports.createSauce = (req, res, next) => {
    //Récupérer l'authentification sur le header


    const saucesObjectValue = JSON.parse(req.body.sauce);
    delete saucesObjectValue._id;
    const sauce = new Sauce({
        ...saucesObjectValue,

        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        userLiked: [],
        userDisliked: []

    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Votre sauce a été ajouter avec succès' }))
        .catch(error => res.status(401).json({ error }));

},
    exports.modifyOneSauce = (req, res, next) => {
        let sauceValue = [];
        req.file ? (
            //Si la modification doit prendre en compte l'image
            Sauce.findOne({
                _id: req.params.id
            })
                .then(sauce => {
                    //Supprimer l'image d'origine
                    const filename = sauce.imagUrl.split('/images')[1];
                    fs.unlinkSync(`images/${filename}`);
                }),
            sauceValue = {
                //Ajouter la nouvelle image
                ...JSON.parse(req.body.sauce),
                imageUrl: `${req.protocol}//${req.get('host')}/images/
                ${req.file.filename}`,
            }
        ) : (
            //Si la modification ne  prends pas en compte l'image
            sauceValue = {
                ...req.body
            }
        )
        Sauce.findByIdAndUpdate({
            _id: req.params.id
        }, {
            ...sauceValue,
            _id: req.params.id
        }
        )
            .then(() => res.status(200).json({ message: 'Sauce modifié avec succès !' }))
            .catch(err => res.status(400).json({ err }));
    },

    exports.deleteOneSauce = (req, res, next) => {
        Sauce.findOne({
            _id: req.params.id,
        })
            .then(sauce => {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
                        .catch(error => res.status(400).json({ error }));
                })
            })
            .catch(err => res.status(500).json({ err }))

    },


    exports.getOneSauce = (req, res, next) => {
        //Verification avec la methode findOne et on passe une comparaison et s'assure que l'id de la sauce est égale a ID de la requête
        Sauce.findById({ _id: req.params.id })
            .then(sauces => res.status(200).json({ sauces }))
            .catch(error => res.status(404).json({ error }))

    },
    exports.getAllSauces = (req, res, next) => {
        Sauce.find()
            .then(sauce => res.status(200).json(sauce))
            .catch(error => res.status(404).json(error));

    },



    exports.addLikesAndDislikes = (req, res, next) => {
        //Add likes and dislikes values in the sauces
        const userId = req.body.userId;
        const likes = req.body.like;
        const sauceId = req.params.id;
        console.log(req.body);

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
                .catch(err => res.status(404).json(new Error()));
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
                .catch(err => res.status(404).json(new Error()));
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
                            .catch(err => res.status(404).json(new Error('Impossible de retirer le likes')))
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
                            .catch(err => res.status(404).json(new Error('Impossible de retirer le likes')))
                    }
                })
                .catch()
        }


    };


