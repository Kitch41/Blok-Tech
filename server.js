
const express = require('express')
let ejs = require('ejs');
const mongoose = require('mongoose');
require('dotenv').config();
var bodyParser = require('body-parser');

const app = express()
const port = 1337


app.set('view engine', 'ejs');

app.use(express.static('static'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// mongo DB connect

const { MongoClient } = require("mongodb");

const uri = process.env.DB_STRING;

const client = new MongoClient(uri, { useNewUrlParser:true, useUnifiedTopology: true});

async function run() {
  try {
    await client.connect();

    // database and collection code goes here
    const db = client.db("User1")
    const datacoll = db.collection("Data")



    // find code goes here
    const result = datacoll.find()



    // iterate code goes here
    await result.forEach(console.log);


    // insert code here

    


  } finally {
    await client.close();
  }
}
run().catch(console.dir);





//Home Get

app.get('/', (req, res) => {
  res.render('index.ejs');
})

//profile edit get

app.get('/edit', (req, res) => {
  res.render('edit.ejs');
})



// -----------------------------trial and error -----------------------------//


app.post('/add-data', (req, res) => {
  const profiledata = [{
    _id: 1,
    username: "Kitch", 
    tag: 3434, 
    firstname: "stef", 
    lastname: "Keuken", 
    email: "stefkeuken@hotmail.com", 
    age: 20
  }]

  const resultdata = client.db("User1").collection("Data").insertMany(profiledata);
  console.log(resultdata.insertedIds);
  console.log(profiledata);


  res.send ("succes")
})

//404 send

app.get('*', (req, res) => {
  res.send("error 404, page not found");
})



// listener

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
