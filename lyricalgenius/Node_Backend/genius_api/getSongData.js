const { default: Axios } = require("axios");
const genius = require('genius-lyrics-api');


//need to alter this function to instead just return the json response of songs
//eventually the onClick when they choose that song will call another fn possibly
//getSongLyrics in the backend to get the lyrics of that song
module.exports = async function (songData) {

    options = {
        apiKey: 'GaXTYV3DtHSYpUqMrNjOO7sgHm-dFUmYRLWY2Pg4UPhD4gvYLkXS28EoAV0SUeje',
        title: songData.SongName,
        artist: songData.artistName,
        optimizeQuery: true
    };

    function checkSongTitle(songData){

        let theSongTitle = songData.title.toLowerCase();
        let optionsTitle = options.title.toLowerCase();
        let theArtist = songData.name.toLowerCase();
        let optionsArtist = options.artist.toLowerCase();
        if(theSongTitle == optionsTitle && theArtist == optionsArtist){
            return songData;  
        }else if(theSongTitle == optionsTitle || theArtist == optionsArtist){
            return songData;
        }else if(theSongTitle.includes(optionsTitle) && theArtist == optionsArtist){
            return songData;
        }
    }
    
    var searchResult = await genius.searchSong(options);
    if(searchResult == null || searchResult.length < 0){
        return null;
    }else if(searchResult.length==1){
        return searchResult;
    }
    var result = searchResult.map(checkSongTitle) 
        result = result.filter(function(element){
            return element !== undefined;
        });
        if(result.length==1){
            let song = await genius.getSong(options);
            console.log(song.lyrics);
            console.log(result);
            return song;
        }
        //console.log(result);
        return result;
}