import React, {Component} from "react";
import axios from 'axios';


function sendEmail(address, sectionArray) {

    axios.post('http://localhost:3001/sendEmail', {
        address: address,
        data: sectionArray,
    }).then(resp => {
        console.log(resp);
    }).catch(err => {
        console.log(err);
    });
}

class SendLyrics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phoneEmailAddress: ""
        }
    }

    // Update input
    handleInput(event) {
        const v = event.target.value;
        this.setState({
            phoneEmailAddress: v
        });
    }

    // Create POST request
    sendLyrics = (event) => {

        event.preventDefault();

        axios.post('http://localhost:3001/sendEmail', {
            address: this.state.phoneEmailAddress,
            data: this.props.LyricsArray,
        }).then(resp => {
            console.log(resp);
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <form onSubmit={this.sendLyrics}>
                <input type='text' name="phoneEmailAddress" placeholder="Enter email or phone" onChange={(event) => this.handleInput(event)}/>
                <button type="submit" onClick={this.sendLyrics}>Send</button>
            </form>
        )
    }
}
export default SendLyrics;
