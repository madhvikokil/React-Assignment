import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { userMetaData } from '../constant/tableConstant';
import TableElement from './table';
import { getUsersList } from '../store/action/userAndBookAction';

const UserList = (props) => {

    useEffect(() => {
        props.getUsersList();
    }, [])

        return(
            <>
                <h1>Users List</h1>
                {props.userList && props.userList.length > 0 ?
                    <TableElement
                        list={props.userList}
                        metaData={userMetaData}
                        redirect={'userList'}
                    /> : <h3>No Data Found</h3>}

            </>
        )
}

const mapStateToProps = (state) => {
    return {
      userList: state.book.userList,
    }
  }

const mapDispatchToProps =(dispatch) => {
    return {
      getUsersList: ()  => dispatch(getUsersList())
    }
  }
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserList));