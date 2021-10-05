import React from 'react';
import { withRouter } from "react-router-dom";
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

function ProtectedRoutes({ component: Component, ...route }) {
    let typeOfUser = localStorage.getItem('typeOfUser');
    return(
        <Route
            {...route}
            render = {(props) => {
                if(route.isAuthenticated) {
                    if(route.roles.includes(typeOfUser)) {
                    return <Component /> 
                    } else {
                        <Redirect to="/404" />
                    }
                } else {
                    <Redirect to="/" />
                }
            }}
        />
        )
    }

export default withRouter(ProtectedRoutes);
