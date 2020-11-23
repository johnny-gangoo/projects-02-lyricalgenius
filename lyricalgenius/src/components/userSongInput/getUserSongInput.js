import React, { Component } from 'react';
import axios from 'axios';
import './getUserSongInput.css';
import ListView from './songListComponent';
import LyricsModal from './modal'

class GetUserInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            name: "",
            launchModal: false,
            songObjIndex: -1,
            uniqueLyricData: [],
            allLyricData: [],
            songData: [],
            preview: []
        }
        this.initialState = this.state;
    }


    handleSubmit = (event) => {
        if (this.state.title !== "" || this.state.name !== "") {
            event.preventDefault();
            axios.post("http://localhost:3001/getSong", this.state).then(res => {
                res = res.data;
                if (res.length === 0) {
                    this.setState = this.initialState;
                    alert("song/artist could not be found");
                    window.location.reload(false);
                } else {
                    this.setState({ songData: res });
                }
                this.handleSongPreview(this.state.songData)
            }).catch(error => {
                console.log(error)
            });
        }
    }

    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleListItemOnClick = async (songObj) => {
        this.setState({ songObjIndex: this.state.songData.indexOf(songObj) });
        await axios.post("http://localhost:3001/getLyrics", songObj).then(res => {
            res = res.data;
            this.setState({ uniqueLyricData: [], allLyricData: [] });
            this.setState({ uniqueLyricData: res.uniqueLyrics, allLyricData: res.originalyrics, launchModal: true });

            if (this.state.uniqueLyricData.length < 1) {
                alert("Lyrics for this song not found");
                window.location.reload(false);
            }
        })
            .catch(error => {
                console.log(error)
            });
    }

    handleSongPreview = (songObj) => {
        if (this.state.preview.length !== 0) {
            this.setState({ preview: [] });
        }

        songObj.map(async (songObj, index) => (
            await axios.post("http://localhost:3001/getPreview", songObj).then(res => {
                let new_state = Object.assign({}, this.state);
                let a = new_state.preview;
                a[index] = res.data;
                this.setState({ preview: a });
            })
                .catch(error => {
                    console.log(error.response)
                })
        ))
    }

    handleCallBack = async() => {
        console.log("we are here")
        await this.setState({launchModal: false});
        this.forceUpdate()

    }

    render() {
        const { songData, launchModal, songObjIndex, preview, uniqueLyricData, allLyricData } = this.state


        return (
            <div>
                <h1>Input Form</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <p><input type='text' placeholder='Enter a Song Name' name='title' onChange={this.handleInputChange.bind(this)} /></p>
                    <p><input type='text' placeholder='Enter the Artist name' name='name' onChange={this.handleInputChange.bind(this)} /></p>
                    <button class="btn btn-primary">Submit</button>
                </form>

                <div class="row">
                {songData.map((songObj, index) => ( //Takes every index in array and place it into a list item
                    <li key={index}>
                            <div class="col-sm-4">
                                <div class="card" onClick={this.handleListItemOnClick.bind(this, songObj)}>
                                    <ListView songObj={songObj} preview={preview} index={index} />
                                    {songObjIndex === index && this.state.launchModal === true &&
                                    <div>
                                     <LyricsModal preview={preview} songObj={songData} songObjIndex={songObjIndex} uniqueLyricData={uniqueLyricData} allLyricData={allLyricData} />
                                    </div>
                                    }
                                  
                                </div>
                            </div>
                    </li>
                ))}
                </div>
            </div>
        )
    }
}
export default GetUserInput;
