import React, {Component} from 'react';
import axios from 'axios';

class GetUserNumber extends Component {
    constructor(props){
        super(props)
        this.state = {
            destNumber: "",
            isSMS: true,
            succssfulSend: ""
        }
        this.initialState=this.state;
    }

    handleSubmit = (event) => {
        //this will prevent data from refreshing
        event.preventDefault();
        //axios post will send the data to the backend in JSON format

        axios.post("http://localhost:3001/sendLyrics", this.state).then(res => {
            res = res.data
            if(res == null){
                this.setState = this.initialState;
            }else{
            this.setState({succssfulSend:res});
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


    render () {
        //below is the same as saying SongName = this.state.SongName
        //and artistName = this.state.artistName
        const {succssfulSend} = this.state
        return (
            <div>
                <h1>Input Number</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Number to send to</label>
                    <p><input type='text' placeholder='Enter a Users Phone Number' name='destNumber' onChange={this.handleInputChange}/></p>
                    <label>Where to send</label>
                    <p><select type="select" name='isSMS' onChange={this.handleInputChange}><option value="true">Send Via SMS</option><option value="false">Send Via Whatsapp</option></select></p>
                    <p><button>Submit</button></p>
                </form>
                <span>{succssfulSend}</span>
            </div>
        )
    }
}
export default GetUserNumber;