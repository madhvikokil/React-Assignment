import React from 'react';
import { Table, Button } from "semantic-ui-react";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { getBookList, deleteBook } from '../store/action/userAndBookAction';
class BookList extends React.Component {
    componentDidMount() {
        this.props.getBookList();
    }

    addBook = (add) => {
        localStorage.setItem('isEdit', add);
        this.props.history.push('create');
    }

    handleEvent = (id, isEdit) => {
        if(isEdit === 'delete') {
            this.props.deleteBook(id);
        } else {
            localStorage.setItem('isEdit', isEdit);
            this.props.history.push(`books/${id}`);
        }
    }

    render(){
    return(
        <React.Fragment>
            <h1>Book List</h1>
            <Button position='right' secondary onClick={() => this.addBook('add')}>Add Book</Button>
            {this.props.bookList && this.props.bookList.length > 0 ? <Table singleLine style={{ margin: "0 auto", width: '80%' }}>
                <Table.Header>
                <Table.Row>
                    {/* <Table.HeaderCell>Book Id</Table.HeaderCell> */}
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Author</Table.HeaderCell>
                    <Table.HeaderCell>Price(Rs.)</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
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
        </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      bookList: state.book.bookList,
    }
  }

const mapDispatchToProps =(dispatch) => {
    return {
      getBookList: ()  => dispatch(getBookList()),
      deleteBook: (id) => dispatch(deleteBook(id))
    }
  }
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookList));