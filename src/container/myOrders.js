import React from 'react';
import { Table } from "semantic-ui-react";
import { connect } from 'react-redux';
import { getMyOrders, getAllOrders } from '../store/action/orderAction';
class MyOrders extends React.Component {

    componentDidMount() {
      const uid = localStorage.getItem('uid');
      const userType = localStorage.getItem('typeOfUser');
      if(userType === 'admin') {
        this.props.getAllOrders();
      }
      else {
        this.props.getMyOrders(uid);
      }
    }

    render(){
        return(
            <>
            <h1>My Orders List</h1>
            {this.props.myOrders && this.props.myOrders.length > 0 ? <Table singleLine style={{ margin: "0 auto", width: '80%' }}>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Book Title</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Discount Applied</Table.HeaderCell>
                        <Table.HeaderCell>Actual Price</Table.HeaderCell>
                        <Table.HeaderCell>User Type</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.props.myOrders && this.props.myOrders.map(order => (
                        <Table.Row key={order.orderId}>
                            <Table.Cell>{order.titleOfBook}</Table.Cell>
                            <Table.Cell>{order.price}</Table.Cell>
                            <Table.Cell>{order.discount}</Table.Cell>
                            <Table.Cell>{order.actualPrice}</Table.Cell>
                            <Table.Cell>{order.user.toUpperCase()}</Table.Cell>
                            <Table.Cell>{order.status}</Table.Cell>
                        </Table.Row>
                        ))}
                    </Table.Body>
                </Table> : <h3>No Order(s) placed</h3>}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      myOrders: state.order.myOrders,
    }
  }

const mapDispatchToProps =(dispatch) => {
    return {
      getMyOrders: (uid)  => dispatch(getMyOrders(uid)),
      getAllOrders: () => dispatch(getAllOrders())
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
