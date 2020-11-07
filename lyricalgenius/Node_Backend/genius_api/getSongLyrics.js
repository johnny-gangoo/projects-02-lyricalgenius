const { default: Axios } = require("axios");
const genius = require('genius-lyrics-api');

module.exports = async function (songData) {

    const options = {
        apiKey: 'GaXTYV3DtHSYpUqMrNjOO7sgHm-dFUmYRLWY2Pg4UPhD4gvYLkXS28EoAV0SUeje',
        title: `${songData.SongName}`,
        artist: `${songData.artistName}`,
        optimizeQuery: true
    };

    var data;
    await genius.getLyrics(options).then((lyrics) => data = lyrics);
    //this will log the all the lyrics into one big string
    //if you want the length you can use data.length
    console.log(data.length);

}