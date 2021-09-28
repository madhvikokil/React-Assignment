import logo from './logo.svg';
import './App.css';
import './assets/semantic/semantic.min.css'
import { Header, Button, Divider } from 'semantic-ui-react'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Header as='h1'>Welcome To React App With Semtic UI</Header>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Divider hidden />
        <div>
          <Button content='Primary' primary />
          <Button content='Secondary' secondary />
        </div>
      </header>
    </div>
  );
}

export default App;
