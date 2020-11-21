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

//Requirements for mongo
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://LyricalGeniusDev:lyricalg3niuspass@cluster0.319vd.mongodb.net/lyricalgeniusdb1?retryWrites=true&w=majority";
const db = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/getSong', async (request, response) =>{
  let songData = await genius.song(request.body);
  response.send(songData);
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

app.post('/createAccount', async (request, response) =>{
    let retVal = "";
    db.connect(err => {
        const collection = db.db("lyricalgeniusdb1").collection("c1");
        // perform actions on the collection object
        // first make sure user does not already exist
        const query = { "username": { "$eq": request.body.username}};
        const projection = {"quantity": 0};
        collection.findOne(query,projection)
            .then(result => {
                if(result) {
                    response.send("User already exists.");
                } else {
                    bcrypt.hash(request.body.password, salt, (err,hash) => {
                        let user = {username: request.body.username, email: request.body.email, firstname: request.body.fname, lastname: request.body.lname, phonenumber: request.body.pnumber, password: hash};
                        collection.insertOne(user).then(result => {
                            response.send("Account created");
                        });
                    }); 
                }
            })
            .catch(err => console.error(`Failed to find document: ${err}`));
    });
});

app.post('/login', async (request, response) =>{
    var retVal = "";
    db.connect(err => {
        const collection = db.db("lyricalgeniusdb1").collection("c1");
        // perform actions on the collection object
        // first make sure user does not already exist
        const query = { "username": { "$eq": request.body.username}};
        const projection = {"quantity": 0};
        collection.findOne(query,projection)
            .then(result => {
                if(result) {
                    bcrypt.compare(request.body.password, result.password, function(error, res) {
                        if(res){
                            response.send("Successful Login");
                        }
                        else{
                            response.send("Incorrrect Password");
                        }
                    });
                } else {
                    response.send("No account with that username");
                }
            })
            .catch(err => console.error(`Failed to find document: ${err}`));
    })
    
});

app.listen(port, () => console.log("Hello from the backend server"));