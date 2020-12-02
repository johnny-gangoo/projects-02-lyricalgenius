import React, {Component} from 'react';
import axios from 'axios';

function favorite (items){
    axios.post("http://54.165.233.151:8083/favorite", {token: items.token.token, song: items.data.songData}).then((response) => {
    },(error) => {
        console.log(error.response)
    });
}

export default favorite;