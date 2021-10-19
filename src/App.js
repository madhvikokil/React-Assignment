import './App.css';
import './assets/semantic/semantic.min.css'
import React from 'react';
import { Suspense }from 'react';
import ProtectedRoute from './routes/protectedRoutes';
import { Route as Router ,Switch } from 'react-router-dom';
import HeaderElement from './component/navMenu';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { routes } from './routes/routes';

function App(props) {
  let typeOfUser;
  let { auth } = props;

  const NotFound = (props) => {
    return <h2>404 Not Found</h2>;
  };

  if(auth.uid) {
    let userType = localStorage.getItem('typeOfUser');
    if(userType === 'admin') {
      typeOfUser = 'admin';
    } else if (userType === 'seller') {
      typeOfUser = 'seller';
    } else {
      typeOfUser = 'customer';
    }
  }
  const getComponent = component => React.lazy(() => import(`./container/${component}`));

  const routeComp = routes.map(
    ({ path, name, componentPath, isExact, authRoute, roles }) => {
      if (authRoute) {
        return (
          <ProtectedRoute
            exact={isExact}
            path={path}
            authRoute={authRoute}
            isAuthenticated={auth.uid}
            component={getComponent(componentPath)}
            key={name}
            roles={roles}
          />
        );
      } else {
        return (
          <Router
            exact={isExact}
            path={path}
            component={getComponent(componentPath)}
            key={name}
          />
        );
      }
    }
  );

  let routesList = <Switch>{routeComp}<Router component={NotFound}/></Switch>
  return (
    <div className="App">
      <Suspense fallback={<p>Loading...</p>}>
      <HeaderElement typeOfUser={typeOfUser} auth={auth}/>
      {routesList}
      </Suspense>
    </div>
    );
  }

const mapStateToProps = (state) => {
  return {
    // isAuthenticated: state.auth.isAuthenticated,
    auth: state.firebase.auth
  }
}
export default withRouter(connect(mapStateToProps)(App));
