import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from "semantic-ui-react";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { getPublishedBookList } from '../store/action/userAndBookAction';
import { placeOrder } from '../store/action/orderAction';

const HomePage = (props) => {

  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    props.getPublishedBookList();
  }, [])

  const placeMyOrder = (book) => {
    if(props.auth.uid) {
      props.placeOrder(book);
    } else {
      props.history.push('signin')
    }
    if(props.orderPlaced === 'Success') {
      setOpen(true);
    }
  }

    return (
      <>
        <h3>Books List</h3>
        {props.publishedBookList && props.publishedBookList.length > 0 ? <Table singleLine style={{ margin: "0 auto", width: '80%' }}>
          <Table.Header>
            <Table.Row>
              {/* <Table.HeaderCell>Id</Table.HeaderCell> */}
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
              <Table.HeaderCell>Price(Rs.)</Table.HeaderCell>
              <Table.HeaderCell>Discount Applied</Table.HeaderCell>
              <Table.HeaderCell>Final Price</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
          {props.publishedBookList && props.publishedBookList.map(book => (
            <Table.Row key={book.id}>
            {/* <Table.Cell>{user.id}</Table.Cell> */}
            <Table.Cell>{book.title}</Table.Cell>
            <Table.Cell>{book.author}</Table.Cell>
            <Table.Cell>{book.price}</Table.Cell>
            <Table.Cell>{book.discount}</Table.Cell>
            <Table.Cell>{book.actualPrice}</Table.Cell>
            {/* <Table.Cell>{book.price}</Table.Cell> */}
            <Table.Cell><Button onClick={() => placeMyOrder(book)}>Place Order</Button></Table.Cell>
            </Table.Row>
          ))}
          </Table.Body>
        </Table> : <h3> No published data found </h3>}
        {isOpen && 
          <Modal
            size={'tiny'}
            open={isOpen}
          >
            <Modal.Header>Place Order Successfully</Modal.Header>
                <Modal.Actions>
                  <Button negative onClick={() => setOpen(false)}>
                    Okay
                  </Button>
                </Modal.Actions>
            </Modal>
        }
      </> 
    )
}

const mapStateToProps = (state) => {
  return {
    publishedBookList: state.book.publishedBookList,
    auth: state.firebase.auth,
    orderPlaced: state.order.orderPlaced
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
    getPublishedBookList: ()  => dispatch(getPublishedBookList()),
    placeOrder: (book)  => dispatch(placeOrder(book))

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
