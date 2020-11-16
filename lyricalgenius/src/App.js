import './App.css';
import GetUserInput from './components/userSongInput/getUserSongInput.js';
import Login from './components/pages/login.js';
import Register from './components/pages/register.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Register />
          <Login />
        </div>
      </header>
    </div>
  );
}
export default App;