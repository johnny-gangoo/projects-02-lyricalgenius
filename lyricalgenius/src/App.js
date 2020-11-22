//import './App.css';
import LoginRegisterPage from './components/pages/loginregister.js';
import GetUserInput from './components/userSongInput/getUserSongInput.js';
import Cards from './components/userSongInput/Cards/Cards.jsx';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/userSongInput/navbar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Navbar />
          <GetUserInput />
          
        </div>
      </header>
    </div>
  );
}
export default App;