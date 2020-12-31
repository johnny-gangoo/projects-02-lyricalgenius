import React, {Component} from 'react';
import axios from 'axios';

function favorite (items){
    axios.post("https://favoriteinvestment.com" + "/favorite", {token: items.token.token, song: items.data.songData}).then((response) => {
    },(error) => {
        console.log(error.response)
    });
}

export default favorite;