import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Table, Button } from "semantic-ui-react";
import { getMyOrders, updateOrderByAdmin } from '../store/action/userAndBookAction';
class Order extends React.Component {

    componentDidMount() {
        this.props.getMyOrders(this.props.match.params.id);
    }
    render(){
        return(
            <React.Fragment>
            <h1>Order Details</h1>
            {this.props.myOrders && this.props.myOrders.length > 0 ? <Table singleLine style={{ margin: "0 auto", width: '80%' }}>
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
        myOrders: state.book.myOrders,
    }
  }

const mapDispatchToProps =(dispatch) => {
    return {
        getMyOrders: (id) => dispatch(getMyOrders(id)),
        updateOrderByAdmin: (order) => dispatch(updateOrderByAdmin(order))
    }
  }
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Order));
