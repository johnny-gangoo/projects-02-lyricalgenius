var express = require("express");
var app = express();
const bodyParser = require("body-parser");
var genius = require("./genius_api/getSongData");
var deezer = require('./deezer_api/deezerAPI');
var parseSongLyrics = require('./genius_api/parseSongLyrics');
const port = 3001;

//Requirements for hashing passwords
const bcrypt = require('bcrypt');
const salt = 10;


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Get Song Enpoint
app.post('/getSong', async (request, response) =>{
    let songData = await genius.song(request.body); // Genius Query 
    if(songData !== null){ // If it gets a response add it as a valid search
        const MongoClient = require('mongodb').MongoClient; // Establish Client
        const uri = "mongodb+srv://LyricalGeniusDev:lyricalg3niuspass@cluster0.319vd.mongodb.net/lyricalgeniusdb1?retryWrites=true&w=majority"; // Database source
        const client = new MongoClient(uri, {useUnifiedTopology: true}); // Link client with source
        try {
            await client.connect(); // Connect to db
            const database = client.db('lyricalgeniusdb1'); // Select db
            const collection = database.collection('c2'); // Select cluster
            const query1 = {title: request.body.title.toLowerCase(), name: request.body.name.toLowerCase()}; // Establish Query
            const result1 = await collection.findOne(query1); // Query
            if(result1 != null){ // If it already exists update
                const update = await collection.updateOne({title: request.body.title.toLowerCase(), name: request.body.name.toLowerCase()}, {$inc: {count: 1}});
            }
            else{ // If it doesn't add a new one
                const add = await collection.insertOne({title: request.body.title.toLowerCase(), name: request.body.name.toLowerCase(), count: 1});
            }
        } finally { // Once its all done with db
            await client.close();
            response.send(songData);
        }
    }
    else{ // No valid responses from Genius
        response.send(songData);
    }
});

// Gets chart data from cluster 2
app.post('/getCharts', async (request, response) =>{
    const MongoClient = require('mongodb').MongoClient; // Establish Client
    const uri = "mongodb+srv://LyricalGeniusDev:lyricalg3niuspass@cluster0.319vd.mongodb.net/lyricalgeniusdb1?retryWrites=true&w=majority"; // Database source
    const client = new MongoClient(uri, {useUnifiedTopology: true}); // Link client with source
    let result = ""; // Define return
    try{
        await client.connect(); // Connect to db
        const database = client.db('lyricalgeniusdb1'); // Select db
        const collection = database.collection('c2'); // Select cluster
        result = await collection.find( { count: { $gt: 0 } }).toArray(); // Query
    } finally {
        await client.close();
        response.send(result);
    }
  });

app.post('/getLyrics', async (request, response) =>{
   let songData = await genius.lyrics(request.body);
   var lyrics = parseSongLyrics(songData.lyrics);
   response.send(lyrics);
});

app.post('/getPreview', async (request, response) =>{
   let songData = await deezer(request.body).catch(error => {
   console.log(error.response)});
   if(songData == undefined){
       response.send("");
   }
    response.send(songData);
});

// Create User Account
app.post('/createAccount', async (request, response) =>{
    const MongoClient = require('mongodb').MongoClient; // Establish Client
    const uri = "mongodb+srv://LyricalGeniusDev:lyricalg3niuspass@cluster0.319vd.mongodb.net/lyricalgeniusdb1?retryWrites=true&w=majority"; // Database source
    const client = new MongoClient(uri, {useUnifiedTopology: true}); // Link client with source
    let retVal = "";
    try{
        await client.connect(); // Connect to db
        const database = client.db('lyricalgeniusdb1'); // Select db
        const collection = database.collection('c1'); // Select cluster
        const result = await collection.findOne( { "username": { "$eq": request.body.username}}); // Query
        if (result == null){ // Means there is no account so we can make one
            const hash = await new Promise((resolve, reject) => { // Need to hash the password so wrap it in a promise
                bcrypt.hash(request.body.password, salt, function (error,hash) {
                  if(error){
                    reject(err);
                  }
                  else{
                    resolve(hash);
                  }
                });
            })
            let user = {username: request.body.username, email: request.body.email, firstname: request.body.fname, lastname: request.body.lname, phonenumber: request.body.pnumber, password: hash};
            const result2 = await collection.insertOne(user);
            retVal = "Account created";
        }
        else{ // Account with that name already exists
            retVal = "User already exists.";
        }
    } finally {
        await client.close();
        response.send(retVal);
    }
});

app.post('/login', async (request, response) =>{
    const MongoClient = require('mongodb').MongoClient; // Establish Client
    const uri = "mongodb+srv://LyricalGeniusDev:lyricalg3niuspass@cluster0.319vd.mongodb.net/lyricalgeniusdb1?retryWrites=true&w=majority"; // Database source
    const client = new MongoClient(uri, {useUnifiedTopology: true}); // Link client with source
    let retVal = "";
    try{
        await client.connect(); // Connect to db
        const database = client.db('lyricalgeniusdb1'); // Select db
        const collection = database.collection('c1'); // Select cluster
        const result = await collection.findOne( { "username": { "$eq": request.body.username}}); // Query
        if(result != null){
            const good = await new Promise((resolve, reject) => { // Need to check the hashed password
                bcrypt.compare(request.body.password, result.password, function(error, result) {
                  if(result){
                    resolve(result);
                  }
                  else{
                    reject(error);
                  }
                });
            })
            if(good){
                retVal = "Successful Login";
            }
            else{
                retVal = "Incorrect Password";
            }
        }
        else{
            retval = "No account with that username";
        }
    } finally{
        await client.close();
        response.send(retVal);
    }
});

// Endpoint for adding a song to favorites
app.post('/favorite', async(request,response) => {
    const MongoClient = require('mongodb').MongoClient; // Establish Client
    const uri = "mongodb+srv://LyricalGeniusDev:lyricalg3niuspass@cluster0.319vd.mongodb.net/lyricalgeniusdb1?retryWrites=true&w=majority"; // Database source
    const client = new MongoClient(uri, {useUnifiedTopology: true}); // Link client with source
    try{
        await client.connect(); // Connect to db
        const database = client.db('lyricalgeniusdb1'); // Select db
        const collection = database.collection('c1'); // Select cluster
        const result = await collection.updateOne({username: "test100"}, {$addToSet: {favoritesongs: request.body.song}}); // Query
    } finally {
        await client.close();
    }
});

app.listen(port, () => console.log("Hello from the backend server"));