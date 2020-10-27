var express = require("express");
var app = express();
const port = 3001;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  
app.get('/test', (request, response) =>{
    response.send("Hello from Node Rest API");
});

app.listen(port, () => console.log("Hello from the backend server"));