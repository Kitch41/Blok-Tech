const express = require("express");
ejs = require("ejs");
require("dotenv").config();

const app = express();
const port = 1337;

app.set("view engine", "ejs");

app.use(express.static("static"));

app.use(express.urlencoded({ extended: true }));

// mongo DB connect

const { MongoClient } = require("mongodb");

const uri = process.env.DB_STRING;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// failed experiment V-------------------------------

// async function run() {
//   try {
//     await client.connect()

//     // database and collection code goes here

//     // find code goes here
//     await coll.find(
//       {_id: "1"},
//       {
//         username: 1,
//         _id: 0

//       }).limit(1).toArray(function(err, datacollected) {
//         console.log(datacollected)
//       })

//     // iterate code goes here
//     // await result.forEach(console.log)

//     // insert code here

//   } finally {
//     // await client.close();

//   }
// }
// // run().catch(console.dir);

//Home Get

app.get("/", async (req, res) => {
  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db("User1");
    const coll = db.collection("Data");

    //-----in case of error-----

    // coll.insertOne({
    //   _id: '1',
    //   username: 'Kitch',
    //   tag: '3434',
    //   firstname: 'Stef',
    //   lastname: 'Keuken',
    //   email: 'stefkeuken@hotmail.com',
    //   age:'20'
    // }
    // );

    const datacollected = await coll.find({}).limit(1).toArray();
    console.log("is the data collected?", datacollected);

    res.render("index.ejs", { datacollected: datacollected });

    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving data");
  }
});

app.on("close", () => {
  client.close();
});

//profile edit get

app.get("/edit/:username", async (req, res) => {

    res.render("edit.ejs")

});

// -----------------------------trial and error (mostly error) -----------------------------//

app.post("/add-data", async (req, res) => {
  console.log("running postroute");

  const username = req.body.username;
  const tag = req.body.tag;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const age = req.body.age;
  const collection = client.db("User1").collection("Data");

  await collection.replaceOne(
    { _id: "1" },
    {
      username: username,
      tag: tag,
      firstname: firstname,
      lastname: lastname,
      email: email,
      age: age,
    }
  );

  console.log("Account aangemaakt voor", username);


  res.redirect("/");
});

//404 send

app.get("*", (req, res) => {
  res.send("error 404, page not found");
});

// listener

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
