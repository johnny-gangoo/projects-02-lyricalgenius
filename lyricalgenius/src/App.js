//import './App.css';
import LoginRegisterPage from './components/pages/loginregister.js';
import GetUserInput from './components/userSongInput/getUserSongInput.js';
import Cards from './components/userSongInput/Cards/Cards.jsx';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/userSongInput/navbar';
import background from './images/background.mp4';
import './login.css';
import logo from './images/logo.png';


function App() {
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
export default App;