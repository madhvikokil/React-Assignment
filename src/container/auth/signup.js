import React from 'react';
import { Button, Grid, Header, Form } from "semantic-ui-react";
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
  handleRadio = (e, {value}) => {
    this.setState({ typeOfUser: value });
  }

  handleSubmit = async (e) => {
    const { smartElement, data } = this.props;
    e.preventDefault();
      const val = smartElement.isFormValid1();
      if(!val.includes(false)) {
        this.props.authSignup(data);
      }
      if(this.props.auth.uid) {
        this.props.history.push("dashboard");
      }
    }

  errorHandle = (type, isData) => {
    const { smartElement } = this.props;
    if(type === 'firstName' || type === 'lastName') {
      return smartElement.stateData.isDirtyForm  && isData.length ? isData.some(r=>r["required"]) ? false : `${type} Required` : false
    }else {
      return smartElement.stateData.isDirtyForm && isData.length ? isData.some(r=>r["required"]) ? isData.some(r=>r[type])? false :`Invalid ${type}` : `${type} Required` : false
    }

  }

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
                       ...firstName, error: this.errorHandle('firstName', formErrors.firstName) })}
            </div>
            <div class="field">
                {smartElement.formInput({
                       ...lastName, error: this.errorHandle('lastName', formErrors.lastName) })}                
            </div>
            <div class="field">
                {smartElement.formInput({
                       ...email, error: this.errorHandle('email', formErrors.email) })}                
            </div>
            <div class="field">
                {smartElement.formInput({
                       ...password, error: this.errorHandle('password', formErrors.password) })}                
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
