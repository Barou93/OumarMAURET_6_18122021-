const express = require('express');
const app = express();

//Create a req on the server
app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été traité !' });
    next();
});

app.use((req, res) => {
    console.log('La requête été executer avec succès !');
})


module.exports = app;