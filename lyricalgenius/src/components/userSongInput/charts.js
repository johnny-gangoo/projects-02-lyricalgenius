import React, { Component } from 'react';
import axios from 'axios';
import './getUserSongInput.css';
import ListView from './songListComponent';
import LyricsModal from './modal'
import Account from '../pages/user.js';

class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topartists: [],
            topsongs: []
        }
    }

    search = () => {
        axios.post("http://localhost:3001/getCharts", this.state)
        .then(res => {
            console.log(res.data);
            let entries = res.data;
            let topCounts = [];
            let topSongs = [];
            let topArtists = [];
            entries.forEach(element => {
                topCounts.push(element.count);
            });
            let topCounts2 = [...topCounts];
            let m = 0;
            while(topSongs.length < 25){
                m = Math.max.apply(Math, topCounts);
                if(m != 0){
                    let index = topCounts.indexOf(m);
                    if(entries[index].title !== ''  && !topSongs.includes(entries[index].title)){
                        topSongs.push(entries[index].title)
                    }
                    topCounts[index] = 0;
                }
                else{
                    break;
                }
            }

            while(topArtists.length < 25){
                m = Math.max.apply(Math, topCounts2)
                if(m != 0){
                    let index = topCounts2.indexOf(m);
                    if(entries[index].name !== '' && !topArtists.includes(entries[index].name)){
                        topArtists.push(entries[index].name)
                    }
                    topCounts2[index] = 0;
                }
                else{
                    break;
                }
            }


            this.setState({topartists: topArtists});
            this.setState({topsongs: topSongs});

        }).catch(error => {
            console.log(error)
        });
      };

    render() {
        return (
            <div>
                <h1 align="center">Lyrical Genius Trending</h1>
                <button onClick={this.search}>test</button>
                <div className="row">
                    <div className="col-6">
                        <div className="card-header" align="center">
                        Trending Song Searches
                        </div>
                        <div className="card-body">
                            <table className="table">
                            {this.state.topsongs.map((song) =>
                                <tr><td align="center">{song}</td></tr>
                            )}
                            </table>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="card-header" align="center">
                        Trending Artist Searches
                        </div>
                        <div className="card-body">
                            <table className="table">
                            {this.state.topartists.map((artist) =>
                                <tr><td align="center">{artist}</td></tr>
                            )}
                            </table>
                        </div>
                    </div>
                </div>         
            </div>
        )
    }
}
export default Charts;
