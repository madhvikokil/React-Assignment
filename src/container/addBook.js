import React from 'react';
import { connect } from 'react-redux';
import { addBook, fetchBookDetails, updateBook, getUsersList } from '../store/action/userAndBookAction';
import FormElements from "../Hoc/formElement";
import { Dimmer, Loader, Modal, Button } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { titleOfBook, authorOfBook, descriptionOfBook, statusOfBook, seller, bookPrice, discountRate } from './../constant/constant';
import { Form } from "semantic-ui-react";
class AddBook extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: "",
            // addedBy: "",
            author: "",
            description: "",
            discount: "",
            price: "",
            status: "",
            title: "",
            isOpen: false,
            userType: "",
            uid: ""
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSelect = () => {
      if(this.state.status === 'PENDING') {
        this.setState({ status: 'PUBLISHED' });
      } else {
        this.setState({ status: 'PENDING' });
      }
    }

    formChange = (e, {value}) => {
      if(value === 'PENDING' || value === 'PUBLISHED') this.setState({ status: value });
      else this.setState({ userType: value.split(" ")[1], uid: value.split(" ")[0] });
    }

    submitBook = (type) => {
          if(type === 'add') {
            this.props.addBook(this.state);
          } else {
            this.props.updateBook(this.state);
          }
          this.setState({ isOpen : false });
          this.props.history.goBack();
    }

    checkNumericNew = (event) => {
      if (!((event.key >= '0' && event.key <= '9') || event.key === 'Delete' || event.key === 'Backspace' || event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        event.preventDefault();
      }
    }

    componentWillReceiveProps(nextProps) {
      let isAdd = localStorage.getItem('isEdit');
      if (isAdd !== 'add' && nextProps.bookDetail) {
        for (const [key, value] of Object.entries(nextProps.bookDetail)) {
          this.setState({
            [key]: `${value}`
          });
        }
      }
    }

    componentDidMount() {
      this.props.getUsersList();
      if(this.props.match.params.id) {
        this.props.fetchBookDetails(this.props.match.params.id);
    }
    }
    

    render(){
        let userData = [];
        if(this.props.userList) {
          this.props.userList.forEach((data) => {
            if(data.userType === 'seller') userData.push({ key: data.uid, value: `${data.uid} ${data.userType}`, text: `${data.firstName} ${data.lastName}` });
          });
        }
        const dropdown = [
            { key: 'pend', value: 'PENDING', text: 'Pending' },
            { key: 'publish', value: 'PUBLISHED', text: 'Published' },
          ]
        
          if(!this.props.bookDetail && this.props.match.params.id) {
            return (
            <Dimmer active>
                <Loader size='medium'>Loading</Loader>
            </Dimmer>
            )
        }

        const isEdit = localStorage.getItem('isEdit');
        const user = localStorage.getItem('typeOfUser');
        const { title, description, author, status, price, discount, userType, uid } = this.state;
        const { formData } = this.props;

        return(
        <>
            {this.props.match.params.id ? (isEdit === 'view' ? <h1> Book </h1>: <h1>Edit Book </h1>) : <h1>Add Book</h1>}
            <Form style={{ margin: "0 auto", width: '80%' }}>
              <Form.Group widths='equal'>
                {formData.formFieldElement({...titleOfBook,
                    onChange: this.handleChange, value: title, readOnly: isEdit === 'view' ? true : false })}                
                {formData.formFieldElement({...authorOfBook,
                    onChange: this.handleChange, value: author, readOnly: isEdit === 'view' ? true : false})}
              </Form.Group>
              {formData.formFieldTextElement({...descriptionOfBook,
                  onChange: this.handleChange, value: description, readOnly: isEdit === 'view' ? true : false })}
              <Form.Group widths='equal'>
                {formData.selectElement({...statusOfBook,
                    options:dropdown, value: status, onChange: this.handleSelect, disabled: isEdit === 'view' ? true : false })}
                {user === 'admin' && formData.selectElement({...seller,
                        options:userData, value: `${uid} ${userType}`, onChange: this.formChange, disabled: isEdit === 'view' ? true : false })}
              </Form.Group>
              <Form.Group widths='equal'>
                {formData.formFieldElement({...bookPrice,
                      onChange: this.handleChange, value: price, readOnly: isEdit === 'view' ? true : false, onKeyDown: this.checkNumericNew })} 
                {formData.formFieldElement({...discountRate,
                      onChange: this.handleChange, value: discount, readOnly: isEdit === 'view' ? true : false, onKeyDown: this.checkNumericNew })} 
              </Form.Group>
              {this.state.isOpen && 
          <Modal
            size={'tiny'}
            open={this.state.isOpen}
          >
            <Modal.Header>{isEdit === 'add' ? 'Add a book' : 'Edit a book'}</Modal.Header>
              <Modal.Content>
                <p>Are you sure you want add/update the book?</p>
              </Modal.Content>
                <Modal.Actions>
                  <Button negative onClick={() => this.setState({ isOpen: false })}>
                    No, Cancel
                  </Button>
                  <Button positive onClick={isEdit === 'add' ? () => this.submitBook('add') : () => this.submitBook('edit')}>
                    Yes
                  </Button>
                </Modal.Actions>
            </Modal>
        }
              {(!this.props.match.params.id || (this.props.match.params.id && isEdit) !== 'view') && <Form.Button
                // type='submit'
                color='twitter'
                disabled={ this.state.author === '' || this.state.description === '' || this.state.price === '' || this.state.status === '' || this.state.title === '' || this.state.discount === '' || user === 'admin' && (this.state.uid === '' || this.state.userType === '')}
                onClick={() => this.setState({ isOpen : true })}
                >{this.props.match.params.id && isEdit === 'edit' ? 'Edit Book' : 'Add Book'}</Form.Button>}
            </Form>
        </>
        )
    }
}

const mapDispatchToProps =(dispatch) => {
    return {
        addBook: (bookDetails)  => dispatch(addBook(bookDetails)),
        fetchBookDetails: (id) => dispatch(fetchBookDetails(id)),
        updateBook: (bookDetail) => dispatch(updateBook(bookDetail)),
        getUsersList: () => dispatch(getUsersList())
    }
}

const mapStateToProps = (state) => {
    return {
      bookStatus: state.book.bookStatus,
      isUpdated: state.book.isUpdated,
      bookDetail: state.book.bookDetail,
      userList: state.book.userList
    }
  }

export default FormElements(withRouter(connect(mapStateToProps, mapDispatchToProps)(AddBook)));