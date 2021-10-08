import React from 'react';
import { Button, Grid, Header, Form } from "semantic-ui-react";
import { authSignup } from '../store/action/authAction';
import { connect } from 'react-redux';
import FormElements from "../Hoc/formElement";
import { withRouter } from "react-router-dom";
class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state={
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        typeOfUser: "customer"
    }
  }

  handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

  handleRadio = (type) => {
    if(type === 'customer')  {
      this.setState({
        typeOfUser: 'seller'
      })
    } else {
      this.setState({
        typeOfUser: 'customer'
      })
    }
  }

  handleSubmit = () => {
    this.props.authSignup(this.state);
    if(this.props.auth.uid) {
      this.props.history.push("dashboard");

    }
  }

  render() {
    const userType = localStorage.getItem('typeOfUser');
    if(this.props.auth.uid && userType) {
      this.props.history.push('dashboard');
    }
    return (
      <React.Fragment>
      <Grid textAlign="center" style={{ height: "75vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" color="teal" textAlign="center">
          Register/Signup
        </Header>
        <Form class="ui large form" onSubmit={this.handleSubmit}>
          <div class="ui stacked segment">
            <div class="field">
                {this.props.formInput({
                       placeholder: 'First Name', type: "text", name: "firstName", onChange: this.handleChange, value:this.state.firstName, icon: 'user'})}
            </div>
            <div class="field">
                {this.props.formInput({
                       placeholder: 'Last Name', type: "text", name: "lastName", onChange: this.handleChange, value:this.state.lastName, icon: 'user'})}                
            </div>
            <div class="field">
                {this.props.formInput({
                       placeholder: 'E-mail address', type: "text", name: "email", onChange: this.handleChange, value:this.state.email, icon: 'user'})}                
            </div>
            <div class="field">
                {this.props.formInput({
                       placeholder: 'Password', type: "password", name: "password", onChange: this.handleChange, value:this.state.password, icon: 'user' })}                
            </div>
            <div class="field">
            {this.props.radioInput({
                label: 'Customer', name: "typeOfUser", onChange:() => this.handleRadio('seller'), value: 'customer', checked: this.state.typeOfUser === 'customer'})}        
            {this.props.radioInput({
                label: 'Seller', name: "typeOfUser", onChange:() => this.handleRadio('customer'), value: 'seller', checked: this.state.typeOfUser === 'seller'})}     
            </div>
            <Button
              color='twitter'
              disabled={this.state.firstName === '' || this.state.lastName === '' || this.state.email === '' || this.state.password === ''}>Sign Up
            </Button>
          </div>

          <div class="ui error message">
            <p>sefwgrg</p>
          </div>
      </Form>
      </Grid.Column>
      </Grid>
      {this.props.authError && <p style={{ padding: "20px", backgroundColor: 'grey' }}>{this.props.authError}</p>}
      </React.Fragment>
    )
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
    authSignup: (auth)  => dispatch(authSignup(auth))
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}
export default FormElements(withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup)));
