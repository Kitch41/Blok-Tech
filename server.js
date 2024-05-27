const express = require("express");
const ejs = require("ejs");
require("dotenv").config();

const app = express();
const port = 1337;

app.set("view engine", "ejs");

app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));

const { MongoClient } = require("mongodb");
const uri = process.env.DB_STRING;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", async (req, res) => {
  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db("User1");
    const coll = db.collection("Data");

    const datacollected = await coll.find({}).limit(1).toArray();
    const apiKey = process.env.IGDB_API_KEY;
    const clientId = process.env.IGDB_CLIENT_ID;
    
    const games = await fetchGames(apiKey, clientId, 0, 10);

    res.render("index.ejs", { datacollected: datacollected, games: games });

    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving data");
  }
});

async function fetchGames(apiKey, clientId, offset, limit) {
  const gamesResponse = await fetch('https://api.igdb.com/v4/games', {
    method: 'POST',
    headers: {
      'Client-ID': clientId,
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'text/plain'
    },
    body: `fields name,rating,cover,summary; sort rating desc; limit ${limit}; offset ${offset};`
  });
  const games = await gamesResponse.json();

  const coverIds = games.map(game => game.cover).filter(id => id != null);

  const coversResponse = await fetch('https://api.igdb.com/v4/covers', {
    method: 'POST',
    headers: {
      'Client-ID': clientId,
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'text/plain'
    },
    body: `fields url; where id = (${coverIds.join(',')});`
  });
  const covers = await coversResponse.json();

  const coverMap = covers.reduce((acc, cover) => {
    acc[cover.id] = cover.url;
    return acc;
  }, {});

  return games.map(game => {
    if (game.cover) {
      game.coverUrl = coverMap[game.cover];
    }
    return game;
  });
}

app.get("/more-games", async (req, res) => {
  const offset = parseInt(req.query.offset, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || 10;
  const apiKey = process.env.IGDB_API_KEY;
  const clientId = process.env.IGDB_CLIENT_ID;

  try {
    const games = await fetchGames(apiKey, clientId, offset, limit);
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving more games");
  }
});

app.on("close", () => {
  client.close();
});

// Profile edit get
app.get("/edit/:username", async (req, res) => {
  res.render("edit.ejs");
});

// Trial and error (mostly error)
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

// 404 send
app.get("*", (req, res) => {
  res.send("error 404, page not found");
});

// Listener
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});