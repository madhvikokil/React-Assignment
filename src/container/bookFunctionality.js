import React from 'react';
import { connect } from 'react-redux';
import AddBook from './addBook';
import { fetchBookDetails } from '../store/action/userAndBookAction';
class UserList extends React.Component {

    componentDidMount() {
        this.props.fetchBookDetails();
    }

    render(){
        return(
            <>
                <AddBook />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        bookDetail: state.book.bookDetail
    }
  }

const mapDispatchToProps =(dispatch) => {
    return {
        fetchBookDetails: (id) => dispatch(fetchBookDetails(id))

    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(UserList);