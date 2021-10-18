import React from 'react';
import { Button } from "semantic-ui-react";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import TableElement from './table';
import { bookMetaData } from '../constant/tableConstant';
import { getBookList } from '../store/action/userAndBookAction';
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
              /> : <h3>No Data Found</h3>}
        </>

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
    }
  }
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookList));