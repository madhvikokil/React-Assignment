import React from 'react';
import { Table, Button, Modal } from "semantic-ui-react";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { getPublishedBookList, placeOrder } from '../store/action/userAndBookAction';
class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state={
        isOpen: false,
    }
  }

  componentDidMount() {
    this.props.getPublishedBookList();
  }

  placeMyOrder = (book) => {
    if(this.props.auth.uid) {
      this.props.placeOrder(book);
    } else {
      this.setState({ isOpen: true })
    }
  }

  render() {
    return (
      <React.Fragment>
        <h3>Published Books List</h3>
        {this.props.publishedBookList && this.props.publishedBookList.length > 0 ? <Table singleLine style={{ margin: "0 auto", width: '80%' }}>
          <Table.Header>
            <Table.Row>
              {/* <Table.HeaderCell>Id</Table.HeaderCell> */}
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
          {this.props.publishedBookList && this.props.publishedBookList.map(book => (
            <Table.Row key={book.id}>
            {/* <Table.Cell>{user.id}</Table.Cell> */}
            <Table.Cell>{book.title}</Table.Cell>
            <Table.Cell>{book.author}</Table.Cell>
            <Table.Cell>{book.price}</Table.Cell>
            <Table.Cell><Button onClick={() => this.placeMyOrder(book)}>Place Order</Button></Table.Cell>
            </Table.Row>
          ))}
          </Table.Body>
        </Table> : <h3> No published data found </h3>}
        {this.state.isOpen && 
          <Modal
            size={'tiny'}
            open={this.state.isOpen}
          >
            <Modal.Header>Place Order</Modal.Header>
              <Modal.Content>
                <p>Are you sure you want place the order</p>
              </Modal.Content>
                <Modal.Actions>
                  <Button negative onClick={() => this.setState({ isOpen: false })}>
                    No, Cancel
                  </Button>
                  <Button positive onClick={() => this.props.history.push('signin')}>
                    Yes, Login
                  </Button>
                </Modal.Actions>
            </Modal>
        }
      </React.Fragment> 
    )
  }
}

const mapStateToProps = (state) => {
  return {
    publishedBookList: state.book.publishedBookList,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
    getPublishedBookList: ()  => dispatch(getPublishedBookList()),
    placeOrder: (book)  => dispatch(placeOrder(book))

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
