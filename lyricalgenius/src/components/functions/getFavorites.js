import React, {Component} from 'react';
import axios from 'axios';

function getFavorites (token){
    axios.post("http://54.165.233.151:8083" + "/getFavorites", token).then((response) => {
    },(error) => {
        console.log(error.response)
    });
}

export default getFavorites;