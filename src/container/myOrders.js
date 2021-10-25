import React from 'react';
import { connect } from 'react-redux';
import { myOrderMetaData } from '../constant/tableConstant';
import TableElement from './table';
import { Dimmer, Loader } from "semantic-ui-react";
import { getMyOrders, getAllOrders } from '../store/action/orderAction';
class MyOrders extends React.Component {

    componentDidMount() {
      const uid = localStorage.getItem('uid');
      const userType = localStorage.getItem('typeOfUser');
      if(userType === 'admin') {
        this.props.getAllOrders();
      }
      else {
        this.props.getMyOrders(uid);
      }
    }

    render(){
      if(!this.props.myOrders) {
        return (
          <Dimmer active>
              <Loader size='medium'>Loading</Loader>
          </Dimmer>
          )
      }
      
        return(
            <>
            <h1>My Orders List</h1>
                {this.props.myOrders && this.props.myOrders.length > 0 ?
                  <TableElement
                    list={this.props.myOrders}
                    metaData={myOrderMetaData}
                  /> : <h3>No Order(s) placed</h3>}
                
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      myOrders: state.order.myOrders,
    }
  }

const mapDispatchToProps =(dispatch) => {
    return {
      getMyOrders: (uid)  => dispatch(getMyOrders(uid)),
      getAllOrders: () => dispatch(getAllOrders())
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
