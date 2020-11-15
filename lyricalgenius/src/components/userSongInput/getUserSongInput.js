import React, { Component } from 'react';
import axios from 'axios';
import './getUserSongInput.css';

class GetUserInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            name: "",
            songData: [],
            optionsFlag: false,
            preview: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.initialState = this.state;
    }


    handleSubmit = (event) => {
        if (this.state.title !== "" || this.state.name !== "") {
            event.preventDefault();
            axios.post("http://localhost:3001/getSong", this.state).then(res => {
                res = res.data;
                console.log(res);
                if (res.length==0) {
                    this.setState = this.initialState;
                    alert("The song entered was not found");
                    window.location.reload(false);
                } else if (res.length === 1) {
                    this.setState({ songData: res[0], optionsFlag: false });
                } else {
                    this.setState({ songData: res, optionsFlag: true });
                }

                this.handleSongPreview(this.state.songData)
            })
                .catch(error => {
                    console.log(error.response)
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
            this.setState({ songData: [] });
            this.setState({ songData: res, optionsFlag: false });
        })
            .catch(error => {
                console.log(error.response)
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

    returnSongPreview = (prev) => {
        var n = prev;
        return n;
    }

    pauseOtherAudioPreviews = (event) => {
        for(const audio of document.querySelectorAll('audio')){
            if(audio !== event.currentTarget){
                audio.pause();
            }
        }
    }

    render() {
        const { title, name, songData } = this.state

        return (
            <div>
                <h1>Input Form</h1>
                <p>The song name is: {title}</p>
                <p>The artist name is: {name}</p>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <p><input type='text' placeholder='Enter a Song Name' name='title' onChange={this.handleInputChange.bind(this)} /></p>
                    <p><input type='text' placeholder='Enter the Artist name' name='name' onChange={this.handleInputChange.bind(this)} /></p>
                    <p><button>Submit</button></p>
                </form>
                {this.state.optionsFlag ? (
                    this.state.songData.map((songObj, index) => (
                        <li onClick={this.handleListItemOnClick.bind(this, songObj)} key={index}>
                            <div>
                                <p>{songObj.title}  {songObj.name}</p>
                                {this.state.preview[index] === "" && 
                                    <h1>test</h1>
                                } 

                                {this.state.preview[index] !== "" && 
                                    <audio src={this.returnSongPreview(this.state.preview[index])} controls="controls"
                                    onPlay={this.pauseOtherAudioPreviews} type='audio/mpeg'></audio>
                                }
                        
                            </div>
                        </li>
                    ))
                ) : (
                        <div>
                            <img src={songData.albumArt}></img>
                        </div>
                    )}
            </div>
        )
    }
}
export default GetUserInput;
