const mongoose = require('mongoose');

//Connect databse

mongoose.connect(
    `mongodb://localhost:27017/SoPeckoko`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (!err) console.log('MongoDB connected ! ');
        else console.log('Connection error' + err);
    }
)
module.exports = mongoose;