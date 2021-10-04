import React from 'react';
import { Button, Grid, Header } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FormElements from "../Hoc/formElement";
import { withRouter } from "react-router-dom";
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
    this.props.history.push("/dashboard");
  }

  render() {
    return (
      <React.Fragment>
        <Grid textAlign="center" style={{ height: "75vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" color="teal" textAlign="center">
            Log-in to your Account
          </Header>
            <form class="ui large form" onSubmit={this.handleSubmit} >
              <div class="ui stacked segment">
                <div class="field">
                    {this.props.formInput({
                       placeholder: 'E-mail address', type: "text", name: "email", onChange: this.handleChange, value:this.state.email, icon: 'user'})}                
                </div>
                <div class="field">
                    {this.props.formInput({
                       placeholder: 'Password', type: "password", name: "password", onChange: this.handleChange, value:this.state.password, icon: 'lock'})}                
                </div>
                <Button
                  color='twitter'
                  disabled={this.state.email === '' || this.state.password === ''} >Log In
                </Button>
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
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

export default FormElements(withRouter(connect(mapStateToProps, mapDispatchToProps)(Login)));