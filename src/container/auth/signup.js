import React from 'react';
import { Button, Grid, Header, Form, Segment } from "semantic-ui-react";
import { authSignup } from '../../store/action/authAction';
import { connect } from 'react-redux';
import FormElements from "../../Hoc/formElement";
import { withRouter } from "react-router-dom";
import { email, password, firstName, lastName } from '../../constant/constant';
class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state={
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        typeOfUser: "customer",
        errorMessages: []
    }
  }

  handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

  handleRadio = (e, {value}) => {
    this.setState({ typeOfUser: value });
  }

  handleSubmit = (e) => {
    let errorMessages = [];
    e.preventDefault();
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const passwordRegex = "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$";

    let emailRegexCheck = emailRegex.test(String(this.state.email));
    if(!emailRegexCheck) errorMessages.push("Invalid email address");

    let passwordRegexTest = this.state.password.length > 6;
    if(!passwordRegexTest) errorMessages.push("Password should be min 6 characters" );
    
    if(errorMessages !== []) {
      this.setState({
        errorMessages: errorMessages
      })
    }

    if(emailRegexCheck && passwordRegexTest){
      this.props.authSignup(this.state);
      if(this.props.auth.uid) {
        this.props.history.push("dashboard");
  
      }
    }
  }

  render() {
    if(this.props.isSignedUp) {
      this.props.history.push('signin');
    }
    return (
      <>
      <Grid textAlign="center" style={{ height: "75vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" color="teal" textAlign="center">
          Register/Signup
        </Header>
        {this.state.errorMessages.length !== 0 ? <Segment style= {{ display: "block"}} stacked>{this.state.errorMessages.map(error => <p>{error}</p>)}</Segment> : null}
        <Form class="ui large form" onSubmit={this.handleSubmit}>
          <div class="ui stacked segment">
            <div class="field">
                {this.props.formInput({
                       ...firstName, onChange: this.handleChange, value:this.state.firstName })}
            </div>
            <div class="field">
                {this.props.formInput({
                       ...lastName, onChange: this.handleChange, value:this.state.lastName })}                
            </div>
            <div class="field">
                {this.props.formInput({
                       ...email,  onChange: this.handleChange, value:this.state.email })}                
            </div>
            <div class="field">
                {this.props.formInput({
                       ...password, onChange: this.handleChange, value:this.state.password })}                
            </div>
            <div class="field">
            {this.props.radioInput({
                label: 'Customer', name: "typeOfUser", onChange: this.handleRadio, value: 'customer', checked: this.state.typeOfUser === 'customer'})}        
            {this.props.radioInput({
                label: 'Seller', name: "typeOfUser", onChange: this.handleRadio, value: 'seller', checked: this.state.typeOfUser === 'seller'})}     
            </div>
            <Button
              color='twitter'
              disabled={this.state.firstName === '' || this.state.lastName === '' || this.state.email === '' || this.state.password === ''}>Sign Up
            </Button>
          </div>
      </Form>
      </Grid.Column>
      </Grid>
      {this.props.authError && <p style={{ padding: "20px", backgroundColor: 'grey' }}>{this.props.authError}</p>}
      </>
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
    auth: state.firebase.auth,
    isSignedUp: state.auth.isSignedUp
  }
}
export default FormElements(withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup)));
