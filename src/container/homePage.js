import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import TableElement from './table';
import { Button, Modal } from "semantic-ui-react";
import { publishedBooksMetaData } from '../constant/tableConstant';
import { placeOrder } from '../store/action/orderAction';
import { Dimmer, Loader } from "semantic-ui-react";
import {  Form, Input } from 'semantic-ui-react';
import { getPublishedBookList } from '../store/action/userAndBookAction';

const HomePage = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  
  useEffect(() => {
    props.getPublishedBookList();
  }, [])

  const placeMyOrder = (book, quantity, price) => {
    props.placeOrder(book, quantity, price);
    if(props.orderPlaced === 'Success') {
      setIsOpen(false);
    }
  }

  const openModal = (data) => {
    console.log("data: ", data);
     if(props.auth.uid) {
        setData(data);
        setIsOpen(true);
    } else {
      props.history.push('signin')  
    }

  }

  const bookList = (data) => {
    return (
      <Button onClick={() => openModal(data)}>Place Order</Button>
    )
  }

  const onChange = (e) => {
    if (e.target.value >= 1) {
      setQuantity(e.target.value)
      let discountApplied = (data.price * e.target.value) - (data.price * e.target.value * data.discount / 100)
      setPrice(discountApplied);
  }
  }

  const checkTotalPrice = () => {
    // bookDetails.price - (bookDetails.price * (bookDetails.discount/100));
    let price = data.price  - (data.price * (data.discount/100));
    setPrice(price);
    return price
  }

  if(!props.publishedBookList){
    return (
      <Dimmer active>
          <Loader size='medium'>Loading</Loader>
      </Dimmer>
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
          <Modal.Header>Place Order</Modal.Header>
          <Modal.Content>
            <p><b>Title:</b> {data && data.title}</p>
            <p><b>Author:</b> {data && data.author}</p>
            <p><b>Price:</b> {data && data.price} <b>Discount:</b> {data && data.discount}%</p>
            <Form.Field
              id='quantity'
              control={Input}
              label='Quantity'
              name='quantity'
              type='number'
              onChange={onChange}
              value={quantity}
              // onKeyDown={checkNumericNew}
              required={props.required}
            />
             <Form.Input
                fluid
                label='Total Price'
                placeholder='Total price'
                type='number'
                disabled='true'
                name="totalPrice"
                value={quantity === 1 ? data && data.actualPrice : price}
              />
            </Modal.Content>
              <Modal.Actions>
                <Button negative onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button positive onClick={() => placeMyOrder(data, quantity, price)}>
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
    placeOrder: (data, quantity, price)  => dispatch(placeOrder(data, quantity, price)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
