import React from 'react';
import { Button, Grid, Header, Segment, Form } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FormElements from "../../Hoc/formElement";
import { withRouter } from "react-router-dom";
import { email, password } from '../../constant/constant';
import { authLogin } from '../../store/action/authAction';

const initialFormObj = {
  email: '',
  password: ''
}

const initialFormErrors = {
  email: [{required: false}, {email: false}],
  password: [{ required:false}, {password: false}]
};

class Login extends React.Component {
  constructor(props){
    super(props);
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const { smartElement, data } = this.props;
    // console.log("authL " this.props.auth);
    const val = smartElement.isFormValid1();
    if(!val.includes(false)) {
      this.props.authLogin(data);
    }
    // await this.setState({
    //   email: this.emailInput.current.inputRef.current.value, 
    //   password: this.passwordInput.current.inputRef.current.value
    // })
    // const checkError = this.props.validation(this.state, 'login');    
    // if(checkError.length > 0) {
    //   await this.setState({
    //     errorMessages: checkError
    //   })
    // } else {
      // const {data} = this.props;
      // console.log("data: ", data);
    // }
  }

  render() {
    const userType = localStorage.getItem('typeOfUser');
    const { smartElement, data, formErrors } = this.props;
    if(this.props.auth.uid && userType) {
      this.props.history.push('dashboard');
    }
    return (
      <>
        <Grid textAlign="center" style={{ height: "75vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" color="teal" textAlign="center">
            Log-in to your Account
          </Header>
            <Form class="ui large form" onSubmit={this.handleSubmit} >
              <div class="ui stacked segment">
                <div class="field">
                    {smartElement.formInput({...email, error: smartElement.stateData.isDirtyForm && formErrors.email && formErrors.email.length ? formErrors.email.some(r=>r["required"]) ? formErrors.email.some(r=>r["email"])? "" :"Invalid Email" : 'Email Required' : "",

})}                
                </div>

                <div class="field">
                    {smartElement.formInput({...password, error: smartElement.stateData.isDirtyForm && formErrors.password && formErrors.password.length ? formErrors.password.some(r=>r["required"]) ? formErrors.password.some(r=>r["password"])? "" :"Invalid Password" : 'Password Required' : "" })}                
                </div>
                <Button
                  color='twitter'
                  >Log In
                </Button>
              </div>
            </Form>
          <div class="ui message">
            New to us? <Link to="/signup">Sign Up</Link>
          </div>
        </Grid.Column>
        </Grid>
        {this.props.authError && <p style={{ padding: "20px", backgroundColor: 'grey' }}>{this.props.authErrorDescription}</p>}

        
      </>
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
    auth: state.firebase.auth,
    authErrorDescription: state.auth.authErrorDescription,
    // isAuthenticated: state.auth.isAuthenticated
  }
}
export default (FormElements((connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))), initialFormObj, initialFormErrors));

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FormElements(Login, initialFormObj, initialFormErrors)));