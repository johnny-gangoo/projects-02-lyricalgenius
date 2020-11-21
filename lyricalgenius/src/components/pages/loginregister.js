
// Imports
import React, {Component} from 'react';
import Login from './login.js';
import Register from './register.js';

// Component that will hold the login and register components
class LoginRegisterPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            loginVisable: false, // Which component is showing
            toggleText: "Already have an account? Login here." // Component toggle text
        }
        this.initialState=this.state;
    }

    handleToggle = (event) => { // Handle click for toggle
        this.setState({
            loginVisable: !this.state.loginVisable // Change the visable component
        });
        if(!this.state.loginVisable){ // Decide the text for the toggle button
            this.setState({
                toggleText: "Need an account? Sign up here."
            });
        }
        else{
            this.setState({
                toggleText: "Already have an account? Login here."
            });
        }
    }

    render () {
        const {toggleText} = this.state
        return (
            <div id="register">
                {this.state.loginVisable && <Login />}
                {!this.state.loginVisable && <Register />}
                <span onClick={this.handleToggle}>{toggleText}</span>
            </div>
        )
    }
}
export default LoginRegisterPage;