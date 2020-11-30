import React, { Component } from 'react';
import LoginRegisterPage from './loginregister.js';
import background from '../../images/background.mp4';
import '../../login.css';
import logo from '../../images/logo.png';
import { getFromStorage} from '../functions/store.js';
import axios from 'axios';

class Signin extends Component {

    componentDidMount(){
        const token = getFromStorage("lgut");
        if(token){
            axios.post("http://localhost:3001/logout", {token: token}).then(res => {
            }).catch(error => {
                console.log(error)
            });
        }
    }

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