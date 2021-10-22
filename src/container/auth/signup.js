import React from 'react';
import { Button, Grid, Header, Form, Segment } from "semantic-ui-react";
import { authSignup } from '../../store/action/authAction';
import { connect } from 'react-redux';
import FormElements from "../../Hoc/formElement";
import { withRouter } from "react-router-dom";
import { email, password, firstName, lastName } from '../../constant/constant';
const initialFormObj = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  typeOfUser: "customer",
}

const initialFormErrors = {
  firstName: [{required: false}],
  lastName: [{ required:false}],
  email: [{required: false}, {email: false}],
  password: [{ required:false}, {password: false}]
};
class Signup extends React.Component {
  constructor(props){
    super(props);

  }


  handleRadio = (e, {value}) => {
    this.setState({ typeOfUser: value });
  }

  handleSubmit = async (e) => {
    const { smartElement, data } = this.props;
    e.preventDefault();
    // await this.setState({
    //   email: this.emailInput.current.inputRef.current.value, 
    //   password: this.passwordInput.current.inputRef.current.value,
    //   firstName: this.firstNameInput.current.inputRef.current.value,
    //   lastName: this.lastNameInput.current.inputRef.current.value
    // })
    // const checkError = this.props.validation(this.state, 'signup');    
    // if(checkError.length > 0) {
    //   await this.setState({
    //     errorMessages: checkError
    //   })
    // } else {
      const val = smartElement.isFormValid1();
      if(!val.includes(false)) {
        this.props.authSignup(data);
      }
      if(this.props.auth.uid) {
        this.props.history.push("dashboard");
      }
    }
  // }

  render() {
    const { smartElement, data, formErrors } = this.props;

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
        {/* {this.state.errorMessages.length !== 0 ? <Segment style= {{ display: "block"}} stacked>{this.state.errorMessages.map(error => <p>{error}</p>)}</Segment> : null} */}
        <Form class="ui large form" onSubmit={this.handleSubmit}>
          <div class="ui stacked segment">
            <div class="field">
                {smartElement.formInput({
                       ...firstName, error: smartElement.stateData.isDirtyForm && formErrors.firstName && formErrors.firstName.length ? formErrors.firstName.some(r=>r["required"]) ? '' : 'First name Required' : "" })}
            </div>
            <div class="field">
                {smartElement.formInput({
                       ...lastName, error: smartElement.stateData.isDirtyForm && formErrors.lastName && formErrors.lastName.length ? formErrors.lastName.some(r=>r["required"]) ? '' : 'Last name Required' : "" })}                
            </div>
            <div class="field">
                {smartElement.formInput({
                       ...email, error: smartElement.stateData.isDirtyForm && formErrors.email && formErrors.email.length ? formErrors.email.some(r=>r["required"]) ? formErrors.email.some(r=>r["email"])? "" :"Invalid Email" : 'Email Required' : "" })}                
            </div>
            <div class="field">
                {smartElement.formInput({
                       ...password, error: smartElement.stateData.isDirtyForm && formErrors.password && formErrors.password.length ? formErrors.password.some(r=>r["required"]) ? formErrors.password.some(r=>r["password"])? "" :"Invalid Password" : 'Password Required' : "" })}                
            </div>
            <div class="field">
            {smartElement.radioInput({
                label: 'Customer', name: "typeOfUser", value: 'customer', checked: data.typeOfUser === 'customer', typeOfUser: 'customer' })}        
            {smartElement.radioInput({
                label: 'Seller', name: "typeOfUser", value: 'seller', checked: data.typeOfUser === 'seller', typeOfUser: 'seller'})}     
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
export default (FormElements((connect(mapStateToProps, mapDispatchToProps)(withRouter(Signup))), initialFormObj, initialFormErrors));
