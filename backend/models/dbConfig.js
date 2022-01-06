const mongoose = require('mongoose');

//Connect databse
require('dotenv').config();

const dbString = process.env.DB_MONGODB;
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}
mongoose.connect(dbString, dbOptions,
    (err) => {
        if (!err) console.log('MongoDB connected !')
        else (err => console.log('Connection error' + err));
    });


//Connection to MongoDB
/*const connection = () => {
    mongoose.connect(dbString, dbOptions)
        .then(() => console.log('MongoDB connected ! '))
        .catch(err => console.log('Connection error' + err));
}*/

/*
const connection = mongoose.createConnection(dbString, dbOptions)


mongoose.connect(process.env.DB_MONGODB,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err) => {
        if (!err) console.log('MongoDB connected ! ');
        else console.log('Connection error' + err);
    }
)*/



