const mongoose = require('mongoose');

//Connect databse

mongoose.connect(
    "mongodb://baroumauret:PokemonMali@sopeckoko-shard-00-00.sm2ev.mongodb.net:27017,sopeckoko-shard-00-01.sm2ev.mongodb.net:27017,sopeckoko-shard-00-02.sm2ev.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-6fpozz-shard-0&authSource=admin&retryWrites=true&w=majority",
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err) => {
        if (!err) console.log('MongoDB connected ! ');
        else console.log('Connection error' + err);
    }
)
