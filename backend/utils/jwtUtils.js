const jwt = require('jsonwebtoken');
require("dotenv").config();



module.exports = {
    generatedTokenForUser: (userData) => {
        return jwt.sign({
            userId: userData._id,

        }, process.env.TOKEN_KEY, {
            expiresIn: '1h'
        })
    },

}

