import React, { Component } from 'react';
import axios from 'axios';
import './getUserSongInput.css';
import ListView from './songListComponent';

class GetUserInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            name: "",
            onSubmitClick: false,
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
                    console.log("HI");
                    this.setState({ songData: res, onSubmitClick: true});
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

    handleCallBack = () => {
        this.setState({onSubmitClick:false});
        console.log("HIIIII");
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
                    <button>Submit</button>
                </form>
                {this.state.onSubmitClick === true &&
                    <div>
                    <ListView songData={songData} preview={this.state.preview} onSubmitClick={this.state.onSubmitClick} handleCallBack={this.handleCallBack}/>
                    </div>
                }
            </div>
        )
    }
}
export default GetUserInput;
