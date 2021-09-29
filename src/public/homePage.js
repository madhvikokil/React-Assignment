import React from 'react';
import { Link } from 'react-router-dom';

export class HomePage extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <h1>Home Page</h1>
        <Link to="/signin"><p>Login Page</p></Link>
        <Link to="/signup"><p>Signup Page</p></Link>
      </React.Fragment> 
    )
  }
}