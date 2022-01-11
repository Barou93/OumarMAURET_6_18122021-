const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require("validator");
require('dotenv').config();


const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: [isEmail],
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 100,
        required: true,
    }
});


//Appeler la fonction avant l'enregistrement sur le serveur
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();

    //Enregistre le password avec le hachage sécurisé générer par bcrypt
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        //On décrypt  password de l'user et on le compare a celui qui est disponible dans la database
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}



module.exports = mongoose.model('User', userSchema);

