import React from 'react';
import { Button } from "semantic-ui-react";
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

    deleteHandler = () => {
      this.props.deleteBook(this.state.deleteId);
      if(this.props.isDeleted) {
        this.props.getBookList();
        this.setState({ isOpen : false });
      }
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
                redirect={'bookList'}
                actionType={'bookListAction'}
              /> : <h3>No Data Found</h3>}
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
      deleteBook: (id) => dispatch(deleteBook(id))
    }
  }
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookList));