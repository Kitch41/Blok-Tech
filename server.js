
const express = require('express')
let ejs = require('ejs');
const app = express()
const port = 1337

app.set('view engine', 'ejs');

//Home Get

app.get('/', onHome)

function onHome(req, res) {
  res.render('index.ejs');
};

//User Get

app.get('/user', onUser)

function onUser(req, res) {
    res.send('hallo user')
};

//profile get

app.get('/user', onProfile)

function onProfile(req, res) {
    res.send('hallo profile')
};

app.get('/user', onProfile)

function onProfile(req, res) {
    res.send('hallo profile')
};

app.get('*', onError)

function onError(req, res) {
  res.send("error 404, page not found")
}


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});