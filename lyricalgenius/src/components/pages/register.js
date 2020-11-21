import React, {Component} from 'react';
import axios from 'axios';

class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            errors: { email: '', password: ''},
            usernameValid: false,
            passwordValid: false
        }
        this.initialState=this.state;
    }

    handleSubmit = (event) => {
        //this will prevent data from refreshing
        event.preventDefault();
        //axios post will send the data to the backend in JSON format
        axios.post("http://localhost:3001/createAccount", this.state).then(res => {
            console.log(res);
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
        return (
            <div id="register">
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Username</label>
                    <br/>
                    <input type='text' placeholder='Username' name='Username' onChange={this.handleInputChange}/>
                    <br/>
                    <span id="username-error"></span>
                    <br/>
                    <label>Password</label>
                    <br/>
                    <input type='password' placeholder='Password' name='Password' onChange={this.handleInputChange}/>
                    <br/>
                    <span id="password-error"></span>
                    <p><button onClick={this.handleValidation}>Register</button></p>
                </form>
            </div>
        )
    }
}
export default Register;
