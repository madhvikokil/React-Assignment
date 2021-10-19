import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Card, Dimmer, Loader } from "semantic-ui-react";
import { getUserDetails } from '../store/action/userAndBookAction';
import { orderMetaData } from '../constant/tableConstant';
import TableElement from './table';
import { updateOrderByAdmin, getMyOrders } from '../store/action/orderAction';
function Order(props) {

    useEffect(() => {
        props.getUserDetails(props.match.params.id);
        props.getMyOrders(props.match.params.id);
    }, [])

        if(!props.userDetails) {
            return (
                <Dimmer active>
                    <Loader size='medium'>Loading</Loader>
                </Dimmer>
                )
        }
        return(
            <>
            <h1>Order Details</h1>
            <Card style={{ margin: '0 auto' }}>
                <Card.Content>
                <Card.Header>{props.userDetails.firstName.toUpperCase()} {props.userDetails.firstName.toUpperCase()}</Card.Header>
                <Card.Meta>
                    <span className='date'>{props.userDetails.userType.toUpperCase()}</span>
                </Card.Meta>
                <Card.Description>
                    {props.userDetails.email}
                </Card.Description>
                </Card.Content>
            </Card>
                {props.myOrders && props.myOrders.length > 0 ?
                    <TableElement
                        list={props.myOrders}
                        metaData={orderMetaData}
                        actionType={'completeOrder'}
                    /> : <h3>No Order(s) Found</h3>}
        </>
        )
}

const mapStateToProps = (state) => {
    return {
        myOrders: state.order.myOrders,
        userDetails: state.book.userDetails
    }
  }

const mapDispatchToProps =(dispatch) => {
    return {
        getMyOrders: (id) => dispatch(getMyOrders(id)),
        getUserDetails: (id) => dispatch(getUserDetails(id)),
        updateOrderByAdmin: (order) => dispatch(updateOrderByAdmin(order))
    }
  }
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Order));
