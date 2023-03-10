
const express = require('express')
let ejs = require('ejs');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express()
const port = 1337


app.set('view engine', 'ejs');

app.use(express.static('static'));



// mongo DB connect

const { MongoClient } = require("mongodb");

const uri = process.env.DB_STRING;

const client = new MongoClient(uri, { useNewUrlParser:true, useUnifiedTopology: true});

async function run() {
  try {
    await client.connect();

    // database and collection code goes here
    const db = client.db("Users")
    const coll = db.collection("User1")



    // find code goes here
    const result = coll.find()



    // iterate code goes here
    await result.forEach(console.log);



  } finally {
    await client.close();
  }
}
run().catch(console.dir);





//Home Get

app.get('/', (req, res) => {
  res.render('index.ejs');
})


//User Get

app.get('/user', (req, res) => {
  res.send('hallo user');
})

//profile edit get


app.get('*', (req, res) => {
  res.send("error 404, page not found");
})


app.get('/edit', (req, res) => {
  res.render('edit.ejs');
})


// submitting new info


// listener

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
