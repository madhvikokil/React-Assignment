import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from "semantic-ui-react";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import TableElement from './table';
import { publishedBooksMetaData } from '../constant/tableConstant';
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
                {props.publishedBookList && props.publishedBookList.length > 0 ?
                    <TableElement
                        list={props.publishedBookList}
                        metaData={publishedBooksMetaData}
                        redirect={'bookList'}
                        actionType={'placeOrderAction'}
                    /> : <h3>No Published Data Found</h3>}
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
