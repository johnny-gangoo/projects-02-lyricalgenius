import React, {Component} from 'react';
import axios from 'axios';

function getFavorites (token){
    axios.post(process.env.REACT_APP_AXIOS_URL + "/getFavorites", token).then((response) => {
    },(error) => {
        console.log(error.response)
    });
}

export default getFavorites;