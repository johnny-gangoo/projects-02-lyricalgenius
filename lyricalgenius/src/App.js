//import './App.css';
import Signin from './components/pages/signin.js';
import GetUserInput from './components/userSongInput/getUserSongInput.js';
import Cards from './components/userSongInput/Cards/Cards.jsx';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/userSongInput/navbar';
import './login.css';
import React, {Component} from 'react';
import Error from './components/pages/404.js';
import Chart from './components/userSongInput/charts.js';
import Favorite from './components/userSongInput/favoritedSongs.js';


import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

class App extends Component{
  render(){
    return(
      <Router>
        <Switch>
        <Route exact path="/" component={Signin}/>
        <Route exact path="/home" component={GetUserInput}/>
        <Route exact path="/chart" component={Chart}/>
        <Route exact path="/favorite" component={Favorite}/>
        <Route component={Error}/>

        </Switch>
      </Router>
    )
  }
}
export default App;