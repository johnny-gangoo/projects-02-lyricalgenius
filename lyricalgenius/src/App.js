//import './App.css';
import Signin from './components/pages/signin.js';
import GetUserInput from './components/userSongInput/getUserSongInput.js';
import Cards from './components/userSongInput/Cards/Cards.jsx';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/userSongInput/navbar';
import './login.css';
import React, {Component} from 'react';
import Error from './components/pages/404.js';


import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

class App extends Component{
  render(){
    return(
      <Router>
        <Switch>
        <Route exact path="/" component={Signin}/>
        <Route exact path="/home" component={GetUserInput}/>
        <Route component={Error}/>
        </Switch>
      </Router>
    )
  }
}
export default App;