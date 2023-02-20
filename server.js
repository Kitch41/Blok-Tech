
const log = console.log;

const express = require('express');
const PORT = process.env.PORT || 1337;
const app = express();


//Home Get

app.get('/', onHome).listen(PORT);

function onHome(req, res) {
    res.send('hallo')
};

//User Get

app.get('/user', onUser).listen(PORT);

function onUser(req, res) {
    res.send('hallo user')
};


app.listen(PORT);