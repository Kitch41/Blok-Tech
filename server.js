
const express = require('express')
let ejs = require('ejs');
const app = express()
const port = 1337

app.set('view engine', 'ejs');

//Home Get

app.get('/', (req, res) => {
  res.render('index.ejs');
})


//User Get

app.get('/user', (req, res) => {
  res.send('hallo user')
})

//profile get

app.get('/user', (req, res) => {
  res.send('hallo profile')
})

app.get('*', (req, res) => {
  res.send("error 404, page not found")
})


app.get('/edit', (req, res) => {
  res.render('edit.ejs')
})


// submitting new info

app.post('/edit', (req,res) => {
    res.render
})


// listener

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});