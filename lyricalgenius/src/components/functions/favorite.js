import React, {Component} from 'react';
import axios from 'axios';

function favorite (items){
    axios.post(process.env.REACT_APP_AXIOS_URL + "/favorite", {token: items.token.token, song: items.data.songData}).then((response) => {
    },(error) => {
        console.log(error.response)
    });
}

export default favorite;