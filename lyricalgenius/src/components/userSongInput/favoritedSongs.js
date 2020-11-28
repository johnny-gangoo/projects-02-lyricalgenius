import React, { Component } from 'react';
import axios from 'axios';
import './getUserSongInput.css';

class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: []
        }
    }

    search =  () => {
        axios.post("http://localhost:3001/getFavorites", this.state)
        .then(res => {
            console.log(res);
            this.setState({favorites: res.data});
        }).catch(error => {
            console.log(error)
        });
      };

    render() {
        return (
            <div>
                <h1 align="center">Lyrical Genius Trending</h1>
                <button onClick={this.search}>test</button>
                <div className="card-header">Favorited Songs</div>
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
        )
    }
}
export default Charts;
