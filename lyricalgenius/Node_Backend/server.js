var express = require("express");
var app = express();
const bodyParser = require("body-parser");
var genius = require("./genius_api/getSongData");
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
  let data = await genius(request.body);
  //send the lyrics (in string format) 
  //to the frontend for the user to view
   response.send(data);
});

app.post('/getLyrics', async (request, response) =>{
   //**************************************//
});

app.post('/createAccount', async (request, response) =>{
    let retVal = "";
    db.connect(err => {
        const collection = db.db("lyricalgeniusdb1").collection("c1");
        // perform actions on the collection object
        // first make sure user does not already exist
        const query = { "username": { "$eq": request.body.Username}};
        const projection = {"quantity": 0};
        collection.findOne(query,projection)
            .then(result => {
                if(result) {
                    retVal = "Username already exists.";
                    console.log("Username already exists.")
                } else {
                    bcrypt.hash(request.body.Password, salt, (err,hash) => {
                        let user = {username: request.body.Username, password: hash};
                        collection.insertOne(user).then(result => {
                            retVal = "Account created.";
                            console.log("Account created.")
                        });
                    }); 
                }
            })
            .catch(err => console.error(`Failed to find document: ${err}`));
        
    });
    return retVal;
});

app.post('/login', async (request, response) =>{
    let retVal = "";
    db.connect(err => {
        const collection = db.db("lyricalgeniusdb1").collection("c1");
        // perform actions on the collection object
        // first make sure user does not already exist
        const query = { "username": { "$eq": request.body.Username}};
        const projection = {"quantity": 0};
        collection.findOne(query,projection)
            .then(result => {
                if(result) {
                    bcrypt.compare(request.body.Password, result.password, function(error, response) {
                        if(response){
                            console.log("Successful login");
                            retVal = "Successful login";
                        }
                        else{
                            console.log("Incorrect Password");
                            retVal = "Incorrect Password";
                        }
                    });
                } else {
                    console.log("No account with that username");
                    retVal = "No account with that username";
                }
            })
            .catch(err => console.error(`Failed to find document: ${err}`));
    });
    return retVal;
});

app.listen(port, () => console.log("Hello from the backend server"));