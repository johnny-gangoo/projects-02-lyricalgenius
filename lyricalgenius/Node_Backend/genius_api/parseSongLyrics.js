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
         //uniqueChars[i].replace("\n", "");
        uniqueChars[i] = uniqueChars[i].replace(/(\r\n|\n|\r)/gm, " ");
     }
     console.log(uniqueChars); 
    // var compare = uniqueChars[1].localeCompare(uniqueChars[3]);
    // console.log(compare);

}