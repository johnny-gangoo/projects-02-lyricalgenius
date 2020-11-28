import React, {Component} from 'react';
import axios from 'axios';

function getFavorites (){
    axios.post("http://localhost:3001/getFavorites", {username: "test100"}).then((response) => {
    },(error) => {
        console.log(error.response)
    });
}

export default getFavorites;