let config = require("./config.js");
let express = require("express");
let app = express();
const bodyParser = require("body-parser");
let genius = require("./genius_api/getSongData");
let deezer = require('./deezer_api/deezerAPI');
let parseSongLyrics = require('./genius_api/parseSongLyrics');
let gmail = require('./phone_email_api/phoneEmailAPI');

const twilio = require('./twillio/send.js');

const User = require('./models/user.js');

const mongoURI = config.mongoose.url; // Database source
const mongoDB = config.mongoose.database; // Database name
const mongoose = require('mongoose');
mongoose.connect(mongoURI, {useUnifiedTopology: true, useNewUrlParser: true});

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

// Get Song Endpoint
app.post('/getSong', async (request, response) =>{
    let songData = await genius.song(request.body); // Genius Query 
    if(songData !== null){ // If it gets a response add it as a valid search
        const MongoClient = require('mongodb').MongoClient; // Establish Client
        const client = new MongoClient(mongoURI, {useUnifiedTopology: true}); // Link client with source
        try {
            await client.connect(); // Connect to db
            const database = client.db(mongoDB); // Select db
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
    const client = new MongoClient(mongoURI, {useUnifiedTopology: true}); // Link client with source
    let result = ""; // Define return
    try{
        await client.connect(); // Connect to db
        const database = client.db(mongoDB); // Select db
        const collection = database.collection('c2'); // Select cluster
        result = await collection.find( { count: { $gt: 0 } }).toArray(); // Query
    } finally {
        await client.close();
        response.send(result);
    }
  });

app.post('/getLyrics', async (request, response) =>{
    let songData = await genius.lyrics(request.body);
    const lyrics = parseSongLyrics(songData.lyrics);
    response.send(lyrics);
});

app.post('/getPreview', async (request, response) =>{
   let songData = await deezer(request.body).catch(error => {
   console.log(error.response)});
   if(songData === undefined){
       response.send("");
   }
    response.send(songData);
});

// Create User Account
app.post('/createAccount', async (request, response) =>{
    const MongoClient = require('mongodb').MongoClient; // Establish Client
    const client = new MongoClient(mongoURI, {useUnifiedTopology: true}); // Link client with source
    let retVal = "";
    try{
        await client.connect(); // Connect to db
        const database = client.db(mongoDB); // Select db
        const collection = database.collection('users'); // Select cluster
        const result = await collection.findOne( { "username": { "$eq": request.body.username}}); // Query
        if (result == null){ // Means there is no account so we can make one
            const hash = await new Promise((resolve, reject) => { // Need to hash the password so wrap it in a promise
                bcrypt.hash(request.body.password, salt, function (error,hash) {
                  if(error){
                    reject(error);
                  }
                  else{
                    resolve(hash);
                  }
                });
            })
            retVal = await new Promise((resolve, reject) => {
                const newUser = new User();
                newUser.username = request.body.username;
                newUser.email = request.body.email;
                newUser.firstname = request.body.fname;
                newUser.lastname = request.body.lname;
                newUser.phonenumber = request.body.pnumber;
                newUser.password = hash;
                newUser.token = Math.random().toString(36).substr(2);
                newUser.save((err, user) => {
                    if(!err){
                        resolve("Account created");
                    }
                    else{
                        reject(err);
                    }
                });
            });
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
    const client = new MongoClient(mongoURI, {useUnifiedTopology: true}); // Link client with source
    let retVal = "";
    try{
        await client.connect(); // Connect to db
        const database = client.db(mongoDB); // Select db
        const collection = database.collection('users'); // Select cluster
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
                const collection = database.collection('usersessions'); // Select cluster
                const result1 = await collection.findOneAndUpdate({userToken: result.token}, {$set: {timestamp: Date.now(), isDeleted: false}},{upsert:true});// Query
                retVal = result.token;
            }
        }
    } finally{
        await client.close();
        if(retVal === ""){
            response.send("Incorrect Password");
        }
        else{
            response.send(retVal);
        }
    }
});

app.post('/verify', async (request, response) =>{
    const MongoClient = require('mongodb').MongoClient; // Establish Client
    const client = new MongoClient(mongoURI, {useUnifiedTopology: true}); // Link client with source
    let retVal = "";
    try{
        await client.connect(); // Connect to db
        const database = client.db(mongoDB); // Select db
        const collection = database.collection('usersessions'); // Select cluster
        const result = await collection.findOne( { userToken: { "$eq": request.body.token}, isDeleted: {"$eq": false}}); // Query
        if(result != null){
            retVal = "Valid";
        }
        else{
            retVal = "Invalid";
        }
    } finally{
        await client.close();
        response.send(retVal);
    }
});

app.post('/logout', async (request, response) =>{
    const MongoClient = require('mongodb').MongoClient; // Establish Client
    const client = new MongoClient(mongoURI, {useUnifiedTopology: true}); // Link client with source
    let retVal = "Logged Out";
    try{
        await client.connect(); // Connect to db
        const database = client.db(mongoDB); // Select db
        const collection = database.collection('usersessions'); // Select cluster
        const result = await collection.findOneAndUpdate( { userToken: { "$eq": request.body.token.token}}, {"$set": {isDeleted: true}}); // Query
    } finally{
        await client.close();
        response.send(retVal);
    }
});

// Endpoint for adding a song to favorites
app.post('/favorite', async(request,response) => {
    const MongoClient = require('mongodb').MongoClient; // Establish Client
    const client = new MongoClient(mongoURI, {useUnifiedTopology: true}); // Link client with source
    try{
        await client.connect(); // Connect to db
        const database = client.db(mongoDB); // Select db
        const collection = database.collection('users'); // Select cluster
        const result = await collection.findOne({'token': {'$eq': request.body.token}}); // Query
        let hasIt = false;
        result.favoritesongs.forEach(song => {
            if(song.id === request.body.song.id){
                hasIt = true;
            }
        });
        if(!hasIt){
            const add = await collection.updateOne({"token": request.body.token}, {$addToSet: {favoritesongs: request.body.song} });
        }
        else{
            const minus = await collection.updateOne({"token": request.body.token}, {$pull: {favoritesongs: request.body.song} });
        }
    } finally {
        await client.close();
    }
});

app.post('/getFavorites', async(request,response) => {
    const MongoClient = require('mongodb').MongoClient; // Establish Client
    const client = new MongoClient(mongoURI, {useUnifiedTopology: true}); // Link client with source
    let retVal = "";
    try{
        await client.connect(); // Connect to db
        const database = client.db(mongoDB); // Select db
        const collection = database.collection('users'); // Select cluster
        const result = await collection.findOne({token: request.body.token}); // Query
        retVal = result.favoritesongs;
    } finally {
        await client.close();
        response.send(retVal);
    }
});

app.post('/checkIsFavorited', async(request,response) =>{
    const MongoClient = require('mongodb').MongoClient; // Establish Client
    const client = new MongoClient(mongoURI, {useUnifiedTopology: true}); // Link client with source
    let retVal = false;
    try{
        await client.connect(); // Connect to db
        const database = client.db(mongoDB); // Select db
        const collection = database.collection('users'); // Select cluster
        const result = await collection.findOne({'token': {'$eq': request.body.token.token}}); // Query
        let hasIt = false
        result.favoritesongs.forEach(song => {
            if(song.id === request.body.song.id){
                hasIt = true;
            }
        });
        retVal = hasIt;
    } finally {
        await client.close();
        response.send(retVal);
    }
});

app.post('/getName', async(request,response) =>{
    const MongoClient = require('mongodb').MongoClient; // Establish Client
    const client = new MongoClient(mongoURI, {useUnifiedTopology: true}); // Link client with source
    let retVal = false;
    try{
        await client.connect(); // Connect to db
        const database = client.db(mongoDB); // Select db
        const collection = database.collection('users'); // Select cluster
        const result = await collection.findOne({'token': {'$eq': request.body.token}}); // Query
        if(result){
            retVal = result.firstname;
        }
        else{
            retVal = "";
        }
    } finally {
        await client.close();
        response.send(retVal);
    }
});

app.post('/sendSMSTwillio', async (request, response) => {
    return (twilio.sendSMS(request.body.address,request.body.data));
});

app.post('/sendWA', async (request, response) => {
    return (twilio.sendWA(request.body.address,request.body.data));
});

app.post('/sendEmail', async (request, response) => {

        if (!(request.body.address)) {
            response.send(false);
        }

        const emailRegex = RegExp('^([\\w\\d._\\-#])+@([\\w\\d._\\-#]+[.][\\w\\d._\\-#]+)+$');
        const phoneRegex = RegExp('^\\d{10}$');

        let messageString = "";
        request.body.data.forEach(element => {
        messageString += "\n\n";
        messageString += element;
    });

        let address = request.body.address;

        if (emailRegex.test(address)) { // If email

            await gmail.sendEmail(address, messageString);

            response.send({type: true, msg: "Successfully sent lyrics to email!"});

        } else if (phoneRegex.test(address)) { // If phone


            /*
            let tmobile = address + "@tmomail.net"
            let att = address + "@txt.att.net"
            let verizon = address + "@vtext.com"

            gmail.sendEmail(tmobile, messageString);
            gmail.sendEmail(att, messageString);
            gmail.sendEmail(verizon, messageString);

            let retVal = twilio.sendSMS(address, [messageString]);
            console.log(retVal);


            if (retVal[1]) {
                response.send({type: true, msg: "Successfully sent lyrics to phone!"});
            } else {
                response.send({type: false, msg: "Failed to send lyrics to phone!"});
            }
            */

        } else {
            response.send({type: false, msg: "Failure (Invalid input)"});
        }

});

app.listen(config.port, () => console.log("Hello from the backend server"));