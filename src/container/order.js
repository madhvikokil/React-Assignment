import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Table, Button, Card, Dimmer, Loader } from "semantic-ui-react";
import { getUserDetails } from '../store/action/userAndBookAction';
import { updateOrderByAdmin, getMyOrders } from '../store/action/orderAction';
class Order extends React.Component {

    componentDidMount() {
        this.props.getUserDetails(this.props.match.params.id);
        this.props.getMyOrders(this.props.match.params.id);
    }
    render(){
        if(!this.props.userDetails) {
            return (
                <Dimmer active>
                    <Loader size='medium'>Loading</Loader>
                </Dimmer>
                )
        }
        return(
            <React.Fragment>
            <h1>Order Details</h1>
            <Card style={{ margin: '0 auto' }}>
                <Card.Content>
                <Card.Header>{this.props.userDetails.firstName.toUpperCase()} {this.props.userDetails.firstName.toUpperCase()}</Card.Header>
                <Card.Meta>
                    <span className='date'>{this.props.userDetails.userType.toUpperCase()}</span>
                </Card.Meta>
                <Card.Description>
                    {this.props.userDetails.email}
                </Card.Description>
                </Card.Content>
            </Card>
            {this.props.myOrders && this.props.myOrders.length > 0 ? <Table singleLine style={{ margin: "20px auto", width: '80%' }}>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Book Title</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Complete the Order</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.props.myOrders && this.props.myOrders.map(order => (
                        <Table.Row key={order.orderId}>
                            <Table.Cell>{order.titleOfBook}</Table.Cell>
                            <Table.Cell>{order.finalPrice}</Table.Cell>
                            <Table.Cell>{order.status}</Table.Cell>
                            <Table.Cell>{order.status === 'COMPLETED' ? order.status : 
                            <Button onClick={() => this.props.updateOrderByAdmin(order)}>Pending -> Complete</Button>}</Table.Cell>
                        </Table.Row>
                        ))}
                    </Table.Body>
                </Table> : <h3>No Order(s) Found</h3>}
        </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        myOrders: state.order.myOrders,
        userDetails: state.book.userDetails
    }
  }

const mapDispatchToProps =(dispatch) => {
    return {
        getMyOrders: (id) => dispatch(getMyOrders(id)),
        getUserDetails: (id) => dispatch(getUserDetails(id)),
        updateOrderByAdmin: (order) => dispatch(updateOrderByAdmin(order))
    }
  }
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Order));
