import React from 'react';
import { Table } from "semantic-ui-react";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { getUsersList } from '../store/action/userAndBookAction';
class UserList extends React.Component {

    componentDidMount() {
        this.props.getUsersList();
    }

    render(){
        return(
            <React.Fragment>
                <h1>Users List</h1>
                {this.props.userList && this.props.userList.length > 0 ? <Table singleLine style={{ margin: "0 auto", width: '80%' }}>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>User Type</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.props.userList && this.props.userList.map(user => (
                        <Table.Row pointer key={user.email} onClick={() => this.props.history.push(`/order/${user.uid}`)}>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>{user.firstName}</Table.Cell>
                            <Table.Cell>{user.lastName}</Table.Cell>
                            <Table.Cell>{user.userType.toUpperCase()}</Table.Cell>
                        </Table.Row>
                        ))}
                    </Table.Body>
                </Table> : <h3>No Data Found</h3>}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      userList: state.book.userList,
    }
  }

const mapDispatchToProps =(dispatch) => {
    return {
      getUsersList: ()  => dispatch(getUsersList())
    }
  }
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserList));