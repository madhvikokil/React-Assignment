import './App.css';
import './assets/semantic/semantic.min.css'
// import { Header, Button, Divider } from 'semantic-ui-react'
import { Route,Switch } from 'react-router-dom';
import  Signup from './public/signup';
import  Login  from './public/login';
import { HomePage } from './public/homePage';
import { AdminDashboard } from './private/admin/index';
import { CustomerDashboard } from './private/customer/index';
import  NotFound from './private/notFound';

function App() {
  let routes =(
    <Switch>
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Login} />
      <Route path="/" exact component={HomePage} />
      {/* <Route component={NotFound} /> */}
  </Switch>
  )

  // let userType = localStorage.getItem('typeOfUser');

  //   routes =(
  //     <Switch>
  //       { userType === 'admin' &&
  //       <>
  //         <Route path="/admin-dashboard" component={AdminDashboard} /> 
  //         <Route component={NotFound} />
  //       </>}
    
  //       { userType === 'customer' &&
  //       <>
  //         <Route path="/customer-dashboard" component={CustomerDashboard} /> 
  //         <Route component={NotFound} />
  //       </>}
    

  //     </Switch>
  //   )

  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;
