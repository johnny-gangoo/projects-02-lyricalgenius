import React, { Component } from 'react';
import axios from 'axios';
import './getUserSongInput.css';
import { getFromStorage, setInStorage} from '../functions/store.js';


class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: []
        }
    }

    componentDidMount(){
        const token = getFromStorage("lgut")
        if(!token){ //lyricalgenius user token
            window.location.href = './';
        }else{
            axios.post("http://localhost:3001/verify", token).then(res => {
                if (res.data == "Invalid") {
                    window.location.href = './';
                }
                else{ // load data
                    const token = getFromStorage("lgut");
                    axios.post("http://localhost:3001/getFavorites", token)
                    .then(res => {
                        this.setState({favorites: res.data});
                    }).catch(error => {
                        console.log(error)
                    });
                }
            }).catch(error => {
                console.log(error)
            });
        }
    }

    render() {
        return (
            <div>
                <h1 align="center">Favorites</h1>
                <div className="card">
                    <div className="card-header" align="center">Favorited Songs</div>
                    <div className="card-body">
                        <table className="table" align="center">
                        <thead align="center">
                            <td>Song</td>
                            <td>Artist</td>
                        </thead>
                        <tbody align="center">
                        {this.state.favorites.map((fav,index) => {
                            return (
                                <tr key={index}>
                                    <td>{fav.title}</td>
                                    <td>{fav.name}</td>
                                </tr>
                            )

                        })}
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default Charts;
