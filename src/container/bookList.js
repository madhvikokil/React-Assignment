import React from 'react';
import { Button, Modal } from "semantic-ui-react";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import TableElement from './table';
import { bookMetaData } from '../constant/tableConstant';
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

    deleteHandler = async () => {
      await this.props.deleteBook(this.state.deleteId);
        if(this.props.isDeleted) {
          await this.props.getBookList();
          await this.setState({ isOpen : false });
        }
      }

    bookListing = (data) => {
      return(
        <>
          <Button icon="eye" onClick={() => this.handleEvent(data.id, 'view')}></Button>
          <Button icon="delete" onClick={() => this.handleEvent(data.id, 'delete')}></Button> 
          <Button icon="edit" onClick={() => this.handleEvent(data.id, 'edit')}></Button> 
        </>
      )
    }

    render(){
    return(
        <>
            <h1>Book List</h1>
            <Button position='right' color="twitter" onClick={() => this.addBook('add')}>Add Book</Button>
            {this.props.bookList && this.props.bookList.length > 0 ?
              <TableElement
                list={this.props.bookList}
                metaData={bookMetaData}
                actionType={'bookListAction'}
                jsx={this.bookListing}
              /> : <h3>No Data Found</h3>}

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
        </>

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
      deleteBook: (id) => dispatch(deleteBook(id)),
    }
  }
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookList));