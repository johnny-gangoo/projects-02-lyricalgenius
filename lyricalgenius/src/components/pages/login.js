import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: ""
        }
        this.initialState=this.state;
    }

    handleSubmit = (event) => {
        //this will prevent data from refreshing
        event.preventDefault();
        //axios post will send the data to the backend in JSON format
        console.log(event);
        axios.post("http://localhost:3001/login", this.state).then(res => {
            //need to show response to user
            //this.setState({songData: res});

            //need to see if i can just set songData:res and not res[0] by checking length of res upon response
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
        const {} = this.state
        return (
            <div id="login">
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <p><input type='text' placeholder='Username' name='Username' onChange={this.handleInputChange}/></p>
                    <p><input type='password' placeholder='Password' name='Password' onChange={this.handleInputChange}/></p>
                    <p><button>Login</button></p>
                </form>
            </div>
        )
    }
}
export default Login;
