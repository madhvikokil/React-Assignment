import React from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { placeOrder, updateOrderByAdmin, getMyOrders } from '../store/action/orderAction';
import { getBookList, deleteBook } from '../store/action/userAndBookAction';
import { Table, Button, Modal } from "semantic-ui-react";

class TableElement extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen:false,
            deleteId: ""
        }
    }

    handleEvent = (id, isEdit) => {
      this.setState({ deleteId : id });
        if(isEdit === 'delete') {
            this.setState({ isOpen : true });
        } else {
            localStorage.setItem('isEdit', isEdit);
            this.props.history.push(`books/${id}`);
        }
    }

    placeMyOrder = (book) => {
      if(this.props.auth.uid) {
        this.props.placeOrder(book);
      } else {
        this.props.history.push('signin')
      }
      if(this.props.orderPlaced === 'Success') {
          this.setState({ isOpen: true })
      }
    }

    deleteHandler = () => {
      this.props.deleteBook(this.state.deleteId);
        if(this.props.isDeleted) {
          this.props.getBookList();
          this.setState({ isOpen : false });
        }
      }
      
    updateOrderByAdmin = (data) => {
      this.props.updateOrderByAdmin(data);
      this.props.getMyOrders(this.props.match.params.id);
    }

    render() {
        const { list, metaData, redirect, actionType } = this.props;

    return(
        <>
        <Table singleLine style={{ margin: "20px auto", width: '80%' }}>
            <Table.Header>
                <Table.Row>
                    {metaData.map(metaData => (<Table.HeaderCell>{metaData.title}</Table.HeaderCell>))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {list && list.map(data => (
                    <Table.Row pointer key={data.email} onClick={() => redirect === 'userList' && this.props.history.push(`/order/${data.uid}`)}>
                        {metaData.map(metaData => (
                        <Table.Cell>{metaData.transform ? metaData.transform(data[metaData.key]) : data[metaData.key]}
                        {metaData.key === '' && actionType === 'bookListAction' ?
                            <>
                                <Button icon="eye" onClick={() => this.handleEvent(data.id, 'view')}></Button>
                                <Button icon="delete" onClick={() => this.handleEvent(data.id, 'delete')}></Button> 
                                <Button icon="edit" onClick={() => this.handleEvent(data.id, 'edit')}></Button> 
                            </>
                            : metaData.key === '' && actionType === 'placeOrderAction' ?
                            <><Button onClick={() => this.placeMyOrder(data)}>Place Order</Button></> 
                            : metaData.key === '' && actionType === 'completeOrder' ?
                            data.status === 'COMPLETED' ? data.status : <Button onClick={() => this.updateOrderByAdmin(data)}>Pending -> Complete</Button>
                            : ''}
                        </Table.Cell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>

        {actionType === 'bookListAction' ? <Modal
            size={'tiny'}
            open={this.state.isOpen}
        >
            <Modal.Header>Delete a book</Modal.Header>
              <Modal.Content>
                <p>Are you sure you want delete the book?</p>
              </Modal.Content>
                <Modal.Actions>
                  <Button negative onClick={() => this.setState({ isOpen: false })}>
                    No, Cancel
                  </Button>
                  <Button positive onClick={this.deleteHandler}>
                    Yes, Delete
                  </Button>
                </Modal.Actions>
        </Modal> : 
          <Modal
          size={'tiny'}
          open={this.state.isOpen}
        >
          <Modal.Header>Place Order Successfully</Modal.Header>
              <Modal.Actions>
                <Button negative onClick={() => this.setState({ isOpen: false })}>
                  Okay
                </Button>
              </Modal.Actions>
          </Modal>}
          </>
    )
    }
}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      orderPlaced: state.order.orderPlaced,
      isDeleted: state.book.isDeleted
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      placeOrder: (book)  => dispatch(placeOrder(book)),
      getBookList: ()  => dispatch(getBookList()),
      deleteBook: (id) => dispatch(deleteBook(id)),
      updateOrderByAdmin: (order) => dispatch(updateOrderByAdmin(order)),
      getMyOrders: (id) => dispatch(getMyOrders(id)),
  
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableElement));