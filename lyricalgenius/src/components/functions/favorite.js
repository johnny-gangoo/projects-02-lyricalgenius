import React, {Component} from 'react';
import axios from 'axios';

function favorite (items){
    console.log(items);
    axios.post("http://localhost:3001/favorite", {"username": "test100"}).then((response) => {
        if(response.data == "Favorited"){
            console.log("it worked");
        }
        else{

        }
    },(error) => {
        console.log(error.response)
    });
}

export default favorite;