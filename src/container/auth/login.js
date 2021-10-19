import React from 'react';
import { Button, Grid, Header, Segment, Form } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FormElements from "../../Hoc/formElement";
import { withRouter } from "react-router-dom";
import { email, password } from '../../constant/constant';
import { authLogin } from '../../store/action/authAction';
class Login extends React.Component {
  constructor(props){
    super(props);
    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
    this.state = {
        email:"",
        password:"",
        errorMessages: []
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.setState({
      email: this.emailInput.current.inputRef.current.value, 
      password: this.passwordInput.current.inputRef.current.value
    })
    const checkError = this.props.validation(this.state, 'login');    
    if(checkError.length > 0) {
      await this.setState({
        errorMessages: checkError
      })
    } else {
      this.props.authLogin(this.state);
    }
  }

  render() {
    const userType = localStorage.getItem('typeOfUser');
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
          {this.state.errorMessages.length > 0 ? <Segment style= {{ display: "block"}} stacked>{this.state.errorMessages.map(error => <p>{error}</p>)}</Segment> : null}
            <Form class="ui large form" onSubmit={this.handleSubmit} >
              <div class="ui stacked segment">
                <div class="field">
                    {this.props.formInput({...email, ref: this.emailInput })}                
                </div>

                <div class="field">
                    {this.props.formInput({...password, ref: this.passwordInput })}                
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

export default FormElements(withRouter(connect(mapStateToProps, mapDispatchToProps)(Login)));