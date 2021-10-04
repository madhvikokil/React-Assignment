import './App.css';
import './assets/semantic/semantic.min.css'
// import { Header, Button, Divider } from 'semantic-ui-react'
import { Route,Switch } from 'react-router-dom';
import  Signup from './public/signup';
import  Login  from './public/login';
import { HomePage } from './public/homePage';
import AdminDashboard from './private/admin/index';
import CustomerDashboard from './private/customer/index';
import SellerDashboard from './private/seller/index';

import  NotFound from './private/notFound';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

function App(props) {
  console.log("isAuthneticated: ", props);
  let typeOfUser;
  let { auth } = props;
  console.log("auth: ", auth);
  // let routes =(
  //   <Switch>
  //     {/* {props.isAuthenticated === null && */}
  //     <>
  //     <Route path="/signup" component={Signup} />
  //     <Route path="/signin" component={Login} />
  //     <Route path="/" exact component={HomePage} />
  //     </>
  //     {/* // <Route component={NotFound} /> */}
  //     {/* } */}
  // </Switch>
  // )
  if(auth.uid) {
    let userType = localStorage.getItem('typeOfUser');
    if(userType === 'admin') {
      typeOfUser = 'admin';
    } else if (userType === 'customer') {
      typeOfUser = 'customer';
    } else {
      typeOfUser = 'seller';
    }
  }

  let routes = (
      <Switch>
        { !auth.uid ? <><Route path="/signup" component={Signup} />
      <Route path="/signin" component={Login} />
      <Route path="/" exact component={HomePage} />
      </> :
        typeOfUser === 'admin' ?
        <>
          <Route exact path="/dashboard" component={AdminDashboard} /> 
          <Route component={NotFound} />
        </>
        : typeOfUser === 'customer' ? 
        <>
          <Route exact path="/dashboard" component={CustomerDashboard} /> 
          <Route component={NotFound} />
        </> 
        : <>
          <Route exact path="/dashboard" component={SellerDashboard} /> 
          <Route component={NotFound} />
          </>
        }
      </Switch>
    )
  // console.log("isAuthneticated: ", this.props);

  return (
    <div className="App">
      {console.log("wrjnge: ",routes)}
      {routes}
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("State: ", state)
  return {
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.firebase.auth
  }
}
export default withRouter(connect(mapStateToProps)(App));
