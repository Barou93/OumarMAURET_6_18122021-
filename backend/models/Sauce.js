const mongoose = require('mongoose');
//const validator = require('../middleware/sauceValidator');

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 50,
    },
    manufacturer: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 150,
    },
    mainPepper: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    imageUrl: {
        type: String,
        required: true,
        unique: true,
    },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] }
});


module.exports = mongoose.model('Sauce', sauceSchema);