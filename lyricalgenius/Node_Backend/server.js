var express = require("express");
var app = express();
const bodyParser = require("body-parser");
var genius = require("./Genius_api/getSongLyrics");
var messenger = require("./twilio_api/send");
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

app.post('/sendLyrics', (request, response) =>{
  // Whether the message was sent
  let success = "";
  // Send via sms
  if(request.body.isSMS === true){
    success = messenger.sendSMS(request.body.destNumber,"This is a test");
  }
  // Send via whatsapp
  else if (request.body.isSMS === "false"){
    success = messenger.sendWA(request.body.destNumber,"This is a test");
  }
  // Return if it was successful
  response.send(success);
});

app.listen(port, () => console.log("Hello from the backend server"));