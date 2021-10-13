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
    this.state = {
        email:"",
        password:"",
        errorMessages: []
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
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
    if(emailRegexCheck && passwordRegexTest) {
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
          {this.state.errorMessages.length !== 0 ? <Segment style= {{ display: "block"}} stacked>{this.state.errorMessages.map(error => <p>{error}</p>)}</Segment> : null}
            <Form class="ui large form" onSubmit={this.handleSubmit} >
              <div class="ui stacked segment">
                <div class="field">
                    {this.props.formInput({...email, onChange: this.handleChange, value:this.state.email })}                
                </div>

                <div class="field">
                    {this.props.formInput({...password, onChange: this.handleChange, value:this.state.password })}                
                </div>
                <Button
                  color='twitter'
                  disabled={this.state.email === '' || this.state.password === ''} >Log In
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