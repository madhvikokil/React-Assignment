import React from 'react';
import { Table } from "semantic-ui-react";
import { connect } from 'react-redux';
import { getBookList } from '../store/action/userAndBookAction';

class BookList extends React.Component {

    componentDidMount() {
        this.props.getBookList();
    }

    render(){
        return(
            <React.Fragment>
                <h1>Book List</h1>
                <Table singleLine>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Book Id</Table.HeaderCell>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Author</Table.HeaderCell>
                        <Table.HeaderCell>Price(Rs.)</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.props.bookList && this.props.bookList.map(book => (
                        <Table.Row key={book.id}>
                            <Table.Cell>{book.id}</Table.Cell>
                            <Table.Cell>{book.title}</Table.Cell>
                            <Table.Cell>{book.author}</Table.Cell>
                            <Table.Cell>{book.price}</Table.Cell>
                            <Table.Cell>{book.status}</Table.Cell>
                        </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(BookList);