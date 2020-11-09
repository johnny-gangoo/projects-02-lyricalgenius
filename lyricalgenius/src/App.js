import './App.css';
import GetUserInput from './components/userSongInput/getUserSongInput.js';
import GetUserNumber from './components/userSongInput/getUserPhoneNumberInput.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <GetUserInput />
          <GetUserNumber />
        </div>
      </header>
    </div>
  );
}
export default App;