
const express = require('express')
let ejs = require('ejs');
const app = express()
const port = 1337

app.set('view engine', 'ejs');

app.use(express.static('static'));

//Home Get

app.get('/', (req, res) => {
  res.render('index.ejs');
})


//User Get

app.get('/user', (req, res) => {
  res.send('hallo user')
})

//profile edit get


app.get('*', (req, res) => {
  res.send("error 404, page not found")
})


app.get('/edit', (req, res) => {
  res.render('edit.ejs')
  res.send("editting")
})


// submitting new info

app.post('/edit', (req,res) => {
    res.render
})


// listener

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});