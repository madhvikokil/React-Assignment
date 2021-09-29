import React from 'react';
import { Button, Grid, Header, Segment, Form, Radio } from "semantic-ui-react";

export class Signup extends React.Component {
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

  handleSubmit = () => {
    console.log("state: ", this.state);
  }

  render() {
    return (
      <>
      {/* <h1 style={{color:"teal"}}>BOOK STORE</h1> */}
      <Grid textAlign="center" style={{ height: "75vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" color="teal" textAlign="center">
          Register/Signup
        </Header>
        <Form class="ui large form" onSubmit={this.handleSubmit}>
          <div class="ui stacked segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="firstName" placeholder="First Name" onChange={this.handleChange}/>
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="lastName" placeholder="Last Name" onChange={this.handleChange}/>
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="email" placeholder="E-mail Address" onChange={this.handleChange}/>
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
              </div>
            </div>
            <div class="field">
              <Radio
                label='Customer'
                name='typeOfUser'
                value='customer'
                checked={this.state.typeOfUser === 'customer'}
                onChange={this.handleChange}
              />
              <Radio
                label='Seller'
                name='typeOfUser'
                value='seller'
                checked={this.state.typeOfUser === 'seller'}
                onChange={this.handleChange}
              />
            </div>
            <button
              class="ui fluid large teal submit button"
              disabled={this.state.firstName === '' || this.state.lastName == '' || this.state.email === '' || this.state.password == ''}>
                Sign Up
            </button>
          </div>

          <div class="ui error message">
            <p>sefwgrg</p>
          </div>
      </Form>
      </Grid.Column>
      </Grid>
      </>
    )
  }
}