import React from 'react';
import { Table, Button, Modal } from "semantic-ui-react";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { getBookList, deleteBook } from '../store/action/userAndBookAction';
class BookList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen:false,
            deleteId: ""
        }
      }

    componentDidMount() {
        this.props.getBookList();
    }

    addBook = (add) => {
        localStorage.setItem('isEdit', add);
        this.props.history.push('create');
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

    deleteHandler = () => {
      this.props.deleteBook(this.state.deleteId);
      if(this.props.isDeleted) {
        this.props.getBookList();
        this.setState({ isOpen : false });
      }
    }

    render(){
    return(
        <React.Fragment>
            <h1>Book List</h1>
            <Button position='right' color="twitter" onClick={() => this.addBook('add')}>Add Book</Button>
            {this.props.bookList && this.props.bookList.length > 0 ? <Table singleLine style={{ margin: "20px auto", width: '80%' }}>
                <Table.Header>
                <Table.Row>
                    {/* <Table.HeaderCell>Book Id</Table.HeaderCell> */}
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Author</Table.HeaderCell>
                    <Table.HeaderCell>Price(Rs.)</Table.HeaderCell>
                    <Table.HeaderCell>Discount</Table.HeaderCell>
                    <Table.HeaderCell>Actual Price</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>User</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.props.bookList && this.props.bookList.map(book => (
                    <Table.Row key={book.id}>
                        {/* <Table.Cell>{book.id}</Table.Cell> */}
                        <Table.Cell>{book.title}</Table.Cell>
                        <Table.Cell>{book.author}</Table.Cell>
                        <Table.Cell>{book.price}</Table.Cell>
                        <Table.Cell>{book.discount}</Table.Cell>
                        <Table.Cell>{book.actualPrice}</Table.Cell>
                        <Table.Cell>{book.userType.toUpperCase()}</Table.Cell>
                        <Table.Cell>{book.status}</Table.Cell>
                        <Table.Cell>
                            <Button icon="eye" onClick={() => this.handleEvent(book.id, 'view')}></Button>
                            <Button icon="delete" onClick={() => this.handleEvent(book.id, 'delete')}></Button> 
                            <Button icon="edit" onClick={() => this.handleEvent(book.id, 'edit')}></Button> 
                        </Table.Cell>
                    </Table.Row>
                    ))}
                </Table.Body>
            </Table> : <h3>No Data Found</h3>}
            {this.state.isOpen && 
          <Modal
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
            </Modal>
        }
        </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      bookList: state.book.bookList,
      isDeleted: state.book.isDeleted
    }
  }

const mapDispatchToProps =(dispatch) => {
    return {
      getBookList: ()  => dispatch(getBookList()),
      deleteBook: (id) => dispatch(deleteBook(id))
    }
  }
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookList));