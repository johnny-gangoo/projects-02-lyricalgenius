import React, {Component} from 'react';
import axios from 'axios';

function getFavorites (token){
    axios.post("https://favoriteinvestment.com" + "/getFavorites", token).then((response) => {
    },(error) => {
        console.log(error.response)
    });
}

export default getFavorites;