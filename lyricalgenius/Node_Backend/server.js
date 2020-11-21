var express = require("express");
var app = express();
const bodyParser = require("body-parser");
var genius = require("./genius_api/getSongData");
var deezer = require('./deezer_api/deezerAPI');
var parseSongLyrics = require('./genius_api/parseSongLyrics');
const port = 3001;


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

app.listen(port, () => console.log("Hello from the backend server"));