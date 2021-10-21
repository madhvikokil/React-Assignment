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
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
    this.state={
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        typeOfUser: "customer",
        errorMessages: []
    }
  }


  handleRadio = (e, {value}) => {
    this.setState({ typeOfUser: value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.setState({
      email: this.emailInput.current.inputRef.current.value, 
      password: this.passwordInput.current.inputRef.current.value,
      firstName: this.firstNameInput.current.inputRef.current.value,
      lastName: this.lastNameInput.current.inputRef.current.value
    })
    const checkError = this.props.validation(this.state, 'signup');    
    if(checkError.length > 0) {
      await this.setState({
        errorMessages: checkError
      })
    } else {
      this.props.authSignup(this.state);
      if(this.props.auth.uid) {
        this.props.history.push("dashboard");
      }
    }
  }

  render() {
    const { formData } = this.props;
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
                {formData.formInput({
                       ...firstName, ref: this.firstNameInput })}
            </div>
            <div class="field">
                {formData.formInput({
                       ...lastName, ref: this.lastNameInput })}                
            </div>
            <div class="field">
                {formData.formInput({
                       ...email, ref: this.emailInput })}                
            </div>
            <div class="field">
                {formData.formInput({
                       ...password, ref: this.passwordInput })}                
            </div>
            <div class="field">
            {formData.radioInput({
                label: 'Customer', name: "typeOfUser", onChange: this.handleRadio, value: 'customer', checked: this.state.typeOfUser === 'customer'})}        
            {formData.radioInput({
                label: 'Seller', name: "typeOfUser", onChange: this.handleRadio, value: 'seller', checked: this.state.typeOfUser === 'seller'})}     
            </div>
            <Button
              color='twitter'
              >Sign Up
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
