import './App.css';
import './assets/semantic/semantic.min.css'
// import { Header, Button, Divider } from 'semantic-ui-react'
import { Route,Switch } from 'react-router-dom';
import { Signup } from './public/signup';
import  Login  from './public/login';
import { HomePage } from './public/homePage';


function App() {
  let routes =(
    <Switch>
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Login} />
      <Route path="/" exact component={HomePage} />
  </Switch>
  )
  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;
