import React, {Component} from 'react';
import Account from './user.js';
import axios from 'axios';

class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            email: "",
            fname: "",
            lname: "",
            pnumber: "",
            password: "",
            password2: "",
            errors: { username: '', email: '', fname: '', lname: '', pnumber: '', password: '', password2: ''},
            usernameValid: false,
            emailValid: false,
            fnameValid: false,
            lnameValid: false,
            pnumberValid: false,
            passwordValid: false,
            password2Valid: false,
            submitRes: ''
        }
    }

    handleSubmit = (event) => {
        //this will prevent data from refreshing
        event.preventDefault();
        //axios post will send the data to the backend in JSON format
        axios.post("http://localhost:3001/createAccount", this.state).then(response => {
            if(response.data == "Account created"){
                Account.setUsername(this.state.username); // Set the current user
            }
            else{
                this.setState({
                    submitRes: "Username already exists"
                })
            }
        })
        .catch(error => {
            console.log(error.response)
        });
    }

    // As user enters data check it
    handleInput(event) {
        const n = event.target.name; // Get the name of the dom element that triggered the event
        const v = event.target.value; // Get the value of that object
        this.setState({  // Set its value to the state
            [n]: v
        },
            () => {this.validate(n,v)} // Validates the input
        );
    }

    // Function to validate user input
    validate(name, value){
        let errors = this.state.errors;
        let usernameValid = this.state.usernameValid;
        let emailValid = this.state.emailValid;
        let fnameValid = this.state.fnameValid;
        let lnameValid = this.state.lnameValid
        let pnumberValid = this.state.pnumberValid;
        let passwordValid = this.state.password;
        let password2Valid = this.state.password2;

        if(name == "username"){
            usernameValid = value.length > 3;
            errors.username = usernameValid ? "" : "Username is too short";
        }
        else if (name == "email"){
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            errors.email = emailValid ? "" : "Invalid Email";
        }
        else if (name == "fname"){
            fnameValid = value.length > 0;
            errors.fname = fnameValid ? "" : "First Name can not be empty";
        }
        else if (name == "lname"){
            lnameValid = value.length > 0;
            errors.lname = lnameValid ? "" : "Last Name can not be empty";
        }
        else if (name == "pnumber"){
            pnumberValid = value.match(/(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})/);
            errors.pnumber = pnumberValid ? "" : "Phone Number Invalid";
        }
        else if (name == "password"){
            passwordValid = value.length > 4;
            errors.password = passwordValid ? "" : "Password to short";
        }
        else{ // passowrd2
            password2Valid = (value == this.state.password);
            errors.password2 = password2Valid ? "" : "Passwords do not match";
        }


        this.setState({ // Updates the errors
                errors: errors,
                usernameValid: usernameValid,
                emailValid: emailValid,
                fnameValid: fnameValid,
                lnameValid: lnameValid,
                pnumberValid: pnumberValid,
                passwordValid: passwordValid,
                password2Valid: password2Valid
        });
    }

    render () {
        const {errors,submitRes} = this.state
        return (
            <div id="register">
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Username</label>
                    <br/>
                    <input type='text' placeholder='username' name='username' onChange={(event) => this.handleInput(event)}/>
                    <br/>
                    <span>{errors.username}</span>
                    <br/>
                    <label>Email</label>
                    <br/>
                    <input type='email' placeholder='email' name='email' onChange={(event) => this.handleInput(event)}/>
                    <br/>
                    <span>{errors.email}</span>
                    <br/>
                    <label>First Name</label>
                    <br/>
                    <input type='text' placeholder='fname' name='fname' onChange={(event) => this.handleInput(event)}/>
                    <br/>
                    <span>{errors.fname}</span>
                    <br/>
                    <label>Last Name</label>
                    <br/>
                    <input type='text' placeholder='lname' name='lname' onChange={(event) => this.handleInput(event)}/>
                    <br/>
                    <span>{errors.lname}</span>
                    <br/>
                    <label>Phone Number</label>
                    <br/>
                    <input type='text' placeholder='pnumber' name='pnumber' onChange={(event) => this.handleInput(event)}/>
                    <br/>
                    <span>{errors.pnumber}</span>
                    <br/>
                    <label>Password</label>
                    <br/>
                    <input type='password' placeholder='password' name='password' onChange={(event) => this.handleInput(event)}/>
                    <br/>
                    <span>{errors.password}</span>
                    <br/>
                    <label>Confirm Password</label>
                    <br/>
                    <input type='password' placeholder='password2' name='password2' onChange={(event) => this.handleInput(event)}/>
                    <br/>
                    <span>{errors.password2}</span>
                    <span>{submitRes}</span>
                    <p><button onClick={this.handleValidation}>Register</button></p>
                </form>
            </div>
        )
    }
}
export default Register;
