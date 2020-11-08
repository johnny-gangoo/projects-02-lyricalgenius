const { default: Axios } = require("axios");
const genius = require('genius-lyrics-api');
//var $ = require("jquery");


module.exports = function (songData) {
    var lyrics = songData.split("\n"); //splits into an array with each new line being a new element
    console.log(lyrics); 
    //console.log($(".lyrics p").val());
    //console.log(songData);
}