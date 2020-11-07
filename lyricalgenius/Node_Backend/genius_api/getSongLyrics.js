const { default: Axios } = require("axios");
const genius = require('genius-lyrics-api');

module.exports = async function (songData) {

    const options = {
        apiKey: 'GaXTYV3DtHSYpUqMrNjOO7sgHm-dFUmYRLWY2Pg4UPhD4gvYLkXS28EoAV0SUeje',
        title: songData.SongName,
        artist: songData.artistName,
        optimizeQuery: true
    };

    var song = await genius.getSong(options).then((song) => song=song)
    //refer to https://github.com/farshed/genius-lyrics-api 
    //which has the different options you can use within this song object
    return song;

}