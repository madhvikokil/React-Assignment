import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import TableElement from './table';
import { publishedBooksMetaData } from '../constant/tableConstant';
import { getPublishedBookList } from '../store/action/userAndBookAction';

const HomePage = (props) => {

  useEffect(() => {
    props.getPublishedBookList();
  }, [])

    return (
      <>
        <h1>Books List</h1>
          {props.publishedBookList && props.publishedBookList.length > 0 ?
            <TableElement
              list={props.publishedBookList}
              metaData={publishedBooksMetaData}
              actionType={'placeOrderAction'}
            /> : <h3>No Published Data Found</h3>}
      </> 
    )
}

const mapStateToProps = (state) => {
  return {
    publishedBookList: state.book.publishedBookList,
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
    getPublishedBookList: ()  => dispatch(getPublishedBookList()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
