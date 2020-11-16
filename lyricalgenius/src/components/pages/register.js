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
            console.log(res.data);
        })
        .catch(error => {
            console.log(error.response)
        });
    }

    handleInputChange (event) {
        const name = event.target.name;
        const val = event.target.value;
        this.setState({[name]: val}, () => {
            this.validate(name, val);
        });

        // switch(name){
        //     case 'username':
                
        //     case 'password':
                
        //     default:
        //         break;
        // }
    }

    render () {
        return (
            <div id="register">
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Username</label>
                    <br/>
                    <input type='text' placeholder='Username' name='Username' value={this.state.username} onChange={(event) => this.handleInputChange(event)}/>
                    <br/>
                    <span id="username-error"></span>
                    <br/>
                    <label>Password</label>
                    <br/>
                    <input type='password' placeholder='Password' name='Password' value={this.state.password} onChange={(event) => this.handleInputChange(event)}/>
                    <br/>
                    <span id="password-error"></span>
                    <p><button onClick={this.handleValidation}>Register</button></p>
                </form>
            </div>
        )
    }
}
export default Register;
