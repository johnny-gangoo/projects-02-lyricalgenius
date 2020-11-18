const { default: Axios } = require("axios");
const genius = require('genius-lyrics-api');
//var $ = require("jquery");


module.exports = function (songData) {
    var lyrics = songData.split("\n\n"); //splits into an array with each new line being a new element
     let uniqueChars = lyrics.filter((c, index) => {
         return lyrics.indexOf(c) === index;
     });
     for(var i = 0; i < uniqueChars.length; i++)
     {
        uniqueChars[i] = uniqueChars[i].replace(/(\r\n|\n|\r|`)/gm, " ");
     }
    //UNCOMMENT TO VIEW LYRICS IN CONSOLE
    //console.log(uniqueChars); 
    return uniqueChars;

}