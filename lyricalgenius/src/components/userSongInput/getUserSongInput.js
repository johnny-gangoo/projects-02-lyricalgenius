import React, {Component} from 'react';
import axios from 'axios';
import './getUserSongInput.css';

class GetUserInput extends Component {
    constructor(props){
        super(props)
        this.state = {
            SongName: "",
            artistName: "",
            songData: [],
            optionsFlag: false
        }
        this.initialState=this.state;
    }

    handleSubmit = (event) => {
        //this will prevent data from refreshing
        event.preventDefault();
        //axios post will send the data to the backend in JSON format
        console.log(event);
        axios.post("http://localhost:3001/getSong", this.state).then(res => {
            //need to show response to user
            //this.setState({songData: res});

            //need to see if i can just set songData:res and not res[0] by checking length of res upon response
            res = res.data;
            if(res == null){
                this.setState = this.initialState;
            }else if(res.length == 1){
                this.setState({songData:res[0], optionsFlag: false});
            }else{
                this.setState({songData:res, optionsFlag: true});
            }
        })
        .catch(error => {
            console.log(error.response)
        });
    }

    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({
            //you can specify multiple inputs here
            //they just need to have different names 
            //brackets are used to dynamically update
            //object key name
           [event.target.name] : event.target.value
        });
    }

    handleListItemOnClick = (d) => {

        console.log(d)
        axios.post("http://localhost:3001/getLyrics", d).then(res => {
            //need to show response to user
            //this.setState({songData: res});
            //need to see if i can just set songData:res and not res[0] by checking length of res upon response
            res = res.data;
            this.setState({songData:[]});
            this.setState({songData:res, optionsFlag: false});
        })
        .catch(error => {
            console.log(error.response)
        });
        //var remove = [...this.state.songData];
        //remove.splice(d,1)
    }

    render () {
        const {SongName, artistName, songData} = this.state
        return (
            <div>
                <h1>Input Form</h1>
                <p>The song name is: {SongName}</p>
                <p>The artist name is: {artistName}</p>
                <form onSubmit={this.handleSubmit}>
                    <p><input type='text' placeholder='Enter a Song Name' name='SongName' onChange={this.handleInputChange}/></p>
                    <p><input type='text' placeholder='Enter the Artist name' name='artistName' onChange={this.handleInputChange}/></p>
                    <p><button>Submit</button></p>
                </form>
                {this.state.optionsFlag ? (
                this.state.songData.map((d,index)=> (
                    <li onClick={this.handleListItemOnClick.bind(this, d)} key={index}>
                        <div>
                            <p>{d.title}  {d.name}</p>
                        </div>
                    </li>
                ))
                ) : (
                <img src={songData.albumArt}></img>
                )}
            </div>
        )
    }
}
export default GetUserInput;
