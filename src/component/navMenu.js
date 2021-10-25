import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { adminroutes, customerRoutes, sellerRoutes , openRoutes } from './constant';
import { logout } from './../store/action/authAction';

class HeaderElement extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;
    let userType = localStorage.getItem('typeOfUser');

    return (
      <Segment inverted>
        <Menu inverted secondary>
        {this.props.auth.uid && userType === 'admin' ?
          adminroutes.map(route => (
            <Menu.Item
              position={route.position}
              as={Link} to={route.to}
              name={route.name}
              active={activeItem === route.active}
              onClick={route.name === 'Log Out' ? this.props.logout : this.handleItemClick}
            />
          )) : userType === 'seller' ?
          sellerRoutes.map(route => (
            <Menu.Item
              position={route.position}
              as={Link} to={route.to}
              name={route.name}
              active={activeItem === route.active}
              onClick={route.name === 'Log Out' ? this.props.logout : this.handleItemClick}
            />
          ))
        : userType === 'customer' ?
          customerRoutes.map(route => (
            <Menu.Item
              position={route.position}
              as={Link} to={route.to}
              name={route.name}
              active={activeItem === route.active}
              onClick={route.name === 'Log Out' ? this.props.logout : this.handleItemClick}
            />
          ))
        : openRoutes.map(route => (
            <Menu.Item
              position={route.position}
              as={Link} to={route.to}
              name={route.name}
              active={activeItem === route.active}
              onClick={this.handleItemClick}
            />
          ))
        }</Menu>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
  return{
      logout: () => dispatch(logout()),
  }
}
  
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderElement));