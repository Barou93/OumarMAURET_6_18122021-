const mongoose = require('mongoose');
const UniqueValidator = require('mongoose-unique-validator');
const validator = require('../middleware/sauceValidator');
const sanitizer = require('mongoose-sanitizer-plugin');

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: {
        type: String, required: true, unique: true
    },
    manufacturer: { type: String, required: true, },
    description: { type: String, required: true, },
    mainPepper: { type: String, required: true, },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] }
});
mongoose.plugin(UniqueValidator);
mongoose.plugin(sanitizer);

module.exports = mongoose.model('Sauce', sauceSchema);