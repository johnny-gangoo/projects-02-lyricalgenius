import React, { Component } from 'react';
import LoginRegisterPage from './loginregister.js';
import background from '../../images/background.mp4';
import '../../login.css';
import logo from '../../images/logo.png';

class Signin extends Component {

    render() {
    return (
        <div>
        <header className="App-header">
        <video id="background" autoPlay loop muted><source src={background} type='video/mp4' /></video>
            <div className="row">
                <div id="logo-img" className="col-6">
                <img src={logo} alt="" width="100%" height="20%"></img>
                </div>
            <LoginRegisterPage />
            
            </div>
        </header>
        </div>
    );
    }
}

export default Signin;