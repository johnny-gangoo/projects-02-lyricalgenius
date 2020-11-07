var express = require("express");
var app = express();
const bodyParser = require("body-parser");
var genius = require("./Genius_api/getSongLyrics");
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
  
app.post('/getLyrics', async (request, response) =>{
  let data = await genius(request.body);
  //send the lyrics (in string format) 
  //to the frontend for the user to view
  response.send(data);
});

app.listen(port, () => console.log("Hello from the backend server"));