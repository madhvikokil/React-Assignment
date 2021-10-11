import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { logout } from './../store/action/authAction';

class HeaderElement extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;
    let userType = localStorage.getItem('typeOfUser');

    return (
      <Segment inverted>
        {this.props.auth.uid && userType === 'admin' ?
        <Menu inverted secondary>
          <Menu.Item
            as={Link} to='/dashboard'
            name='Home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link} to='/dashboard/users'
            name='Users list'
            active={activeItem === 'userList'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link} to='/dashboard/books'
            name='Book list'
            active={activeItem === 'bookList'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link} to='/dashboard/my-orders'
            name='My Orders'
            active={activeItem === 'myOrder'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            position='right'
            as={Link} to='/'
            name='Log Out'
            active={activeItem === 'bookList'}
            onClick={this.props.logout}
          />
        </Menu>: userType === 'customer' ? 
        <Menu inverted secondary>
          <Menu.Item
            as={Link} to='/dashboard'
            name='Home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link} to='/dashboard/my-orders'
            name='My Order'
            active={activeItem === 'myOrder'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            position='right'
            as={Link} to='/'
            name='Log Out'
            active={activeItem === 'bookList'}
            onClick={this.props.logout}
          />
        </Menu> : userType === 'seller' ?
        <Menu inverted secondary>
          <Menu.Item
            as={Link} to='/dashboard'
            name='Home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link} to='/dashboard/books'
            name='Books List'
            active={activeItem === 'addOrder'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
              as={Link} to='/dashboard/my-orders'
              name='My Order'
              active={activeItem === 'myOrder'}
              onClick={this.handleItemClick}
            />
          <Menu.Item
            position='right'
            as={Link} to='/'
            name='Log Out'
            active={activeItem === 'bookList'}
            onClick={this.props.logout}
          />
        </Menu> :
        <Menu inverted secondary>
          <Menu.Item
            as={Link} to='/'
            name='Home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link} to='/signin'
            name='Sign In'
            active={activeItem === 'signin'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link} to='/signup'
            name='Sign Up'
            active={activeItem === 'signup'}
            onClick={this.handleItemClick}
          />
        </Menu>}
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