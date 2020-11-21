import React, { Component } from 'react';
import axios from 'axios';
import './getUserSongInput.css';
import DisplayLyrics from './displayLyricsComponent';
import ListView from './songListComponent';

class GetUserInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            name: "",
            onSubmitClick: true,
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
                    this.setState({ songData: res, onSubmitClick: true });
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

    handleListItemOnClick = (songObj) => {
        axios.post("http://localhost:3001/getLyrics", songObj).then(res => {
            res = res.data;
            this.setState({ uniqueLyricData: [], allLyricData: [] });
            this.setState({ uniqueLyricData: res.uniqueLyrics, allLyricData: res.originalyrics, onSubmitClick: false });

            if (this.state.uniqueLyricData.length <= 1) {
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



    render() {
        const { title, name, songData, onSubmitClick } = this.state

        return (
            <div>
                <h1>Input Form</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <p><input type='text' placeholder='Enter a Song Name' name='title' onChange={this.handleInputChange.bind(this)} /></p>
                    <p><input type='text' placeholder='Enter the Artist name' name='name' onChange={this.handleInputChange.bind(this)} /></p>
                    <button>Submit</button>
                </form>

                {onSubmitClick === true &&
                    songData.map((songObj, index) => (
                        <li onClick={this.handleListItemOnClick.bind(this, songObj)} key={index}>
                            <div>
                                <ListView songObj={songObj} preview={this.state.preview} index={index} />
                            </div>
                        </li>
                    ))}

                {onSubmitClick === false &&
                    <DisplayLyrics uniqueLyricData={this.state.uniqueLyricData} allLyricData={this.state.allLyricData} />
                }
            </div>
        )
    }
}
export default GetUserInput;
