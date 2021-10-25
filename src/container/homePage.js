import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import TableElement from './table';
import { Button, Modal } from "semantic-ui-react";
import { publishedBooksMetaData } from '../constant/tableConstant';
import { placeOrder } from '../store/action/orderAction';
import { getPublishedBookList } from '../store/action/userAndBookAction';

const HomePage = (props) => {
  const [isOpen, setIsOpen] = useState(false);

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
      setIsOpen(true);
    }
  }

  const bookList = (data) => {
    return (
      <Button onClick={() => placeMyOrder(data)}>Place Order</Button>
    )
  }
    return (

      <>
        <h1>Books List</h1>
          {props.publishedBookList && props.publishedBookList.length > 0 ?
            <TableElement
              list={props.publishedBookList}
              metaData={publishedBooksMetaData}
              actionType={'placeOrderAction'}
              jsx={bookList}
            /> : <h3>No Published Data Found</h3>}

          <Modal
          size={'tiny'}
          open={isOpen}
        >
          <Modal.Header>Place Order Successfully</Modal.Header>
              <Modal.Actions>
                <Button negative onClick={() => setIsOpen(false)}>
                  Okay
                </Button>
              </Modal.Actions>
          </Modal>
      </> 
    )
}

const mapStateToProps = (state) => {
  return {
    publishedBookList: state.book.publishedBookList,
    orderPlaced: state.order.orderPlaced,
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
    getPublishedBookList: ()  => dispatch(getPublishedBookList()),
    placeOrder: (book)  => dispatch(placeOrder(book)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
