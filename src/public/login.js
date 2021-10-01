import React from 'react';
import { Button, Grid, Header, Segment } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authLogin } from './../store/action/authAction';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
        email:"",
        password:"",
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.authLogin(this.state);
  }

  render() {
    return (
      <React.Fragment>
        {/* <h1 style={{color:"teal"}}>BOOK STORE</h1> */}
        <Grid textAlign="center" style={{ height: "75vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" color="teal" textAlign="center">
            Log-in to your Account
          </Header>
            <form class="ui large form" onSubmit={this.handleSubmit} >
              <div class="ui stacked segment">
                <div class="field">
                  <div class="ui left icon input">
                    <i class="user icon"></i>
                    <input type="text" name="email" placeholder="E-mail address" onChange={this.handleChange}/>
                  </div>
                </div>
                <div class="field">
                  <div class="ui left icon input">
                    <i class="lock icon"></i>
                    <input type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                  </div>
                </div>
                <button 
                  class="ui fluid large teal submit button"
                  disabled={this.state.email === '' || this.state.password == ''}>
                    Login
                </button>
              </div>

              <div class="ui error message">
                <p>{this.props.authError}</p>
              </div>
            </form>
          <div class="ui message">
            New to us? <Link to="/signup">Sign Up</Link>
          </div>
        </Grid.Column>
        </Grid>

        {this.props.authError && <p style={{ padding: "20px", backgroundColor: 'grey' }}>{this.props.authError}</p>}
      </React.Fragment>
    )
  }
}
const mapDispatchToProps =(dispatch) => {
  return {
    authLogin: (auth)  => dispatch(authLogin(auth))
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);