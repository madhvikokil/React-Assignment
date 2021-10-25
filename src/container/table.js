import React from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { placeOrder, updateOrderByAdmin, getMyOrders } from '../store/action/orderAction';
import { getBookList, deleteBook } from '../store/action/userAndBookAction';
import { Table, Button, Modal } from "semantic-ui-react";

class TableElement extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen:false,
            deleteId: ""
        }
    }
    render() {
        const { list, metaData, redirect, jsx } = this.props;

    return(
        <>
        <Table singleLine style={{ margin: "20px auto", width: '80%' }}>
            <Table.Header>
                <Table.Row>
                    {metaData.map(metaData => (<Table.HeaderCell>{metaData.title}</Table.HeaderCell>))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {list && list.map(data => (
                    <Table.Row pointer key={data.email} onClick={() => redirect === 'userList' && this.props.history.push(`/order/${data.uid}`)}>
                        {metaData.map(metaData => (
                        <Table.Cell>{metaData.transform ? metaData.transform(data[metaData.key]) : data[metaData.key]}
                        {metaData.key === '' && jsx(data)}
                        </Table.Cell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
          </> 
    )
    }
}

export default withRouter(TableElement);