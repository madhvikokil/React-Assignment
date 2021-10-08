import React from 'react';
import { Table } from "semantic-ui-react";
import { connect } from 'react-redux';
import { getMyOrders } from '../store/action/userAndBookAction';
class MyOrders extends React.Component {

    componentDidMount() {
      const uid = localStorage.getItem('uid');
      this.props.getMyOrders(uid);
    }

    render(){
        return(
            <React.Fragment>
            <h1>My Orders List</h1>
            {this.props.myOrders && this.props.myOrders.length > 0 ? <Table singleLine style={{ margin: "0 auto", width: '80%' }}>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Book Title</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        {/* <Table.HeaderCell>Order Date</Table.HeaderCell> */}
                        <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.props.myOrders && this.props.myOrders.map(order => (
                        <Table.Row key={order.orderId}>
                            <Table.Cell>{order.titleOfBook}</Table.Cell>
                            <Table.Cell>{order.finalPrice}</Table.Cell>
                            {/* <Table.Cell>{order.orderDate}</Table.Cell> */}
                            <Table.Cell>{order.status}</Table.Cell>
                        </Table.Row>
                        ))}
                    </Table.Body>
                </Table> : <h3>No Order(s) placed</h3>}
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
      getMyOrders: (uid)  => dispatch(getMyOrders(uid))
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
