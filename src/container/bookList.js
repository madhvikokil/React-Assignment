import React from 'react';
import { Table, Button } from "semantic-ui-react";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { getBookList } from '../store/action/userAndBookAction';
class BookList extends React.Component {
    componentDidMount() {
        this.props.getBookList();
    }

    addBook = () => {
        this.props.history.push('create');
    }

    render(){
    return(
        <React.Fragment>
            <h1>Book List</h1>
            <Button position='right' secondary onClick={this.addBook}>Add Book</Button>
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
                            <Button icon="eye"></Button>
                            <Button icon="delete"></Button> 
                            <Button icon="edit" onClick={() => this.props.history.push(`books/${book.id}`)}></Button> 
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
      getBookList: ()  => dispatch(getBookList())
    }
  }
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookList));