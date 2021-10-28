import React from 'react';
import { connect } from 'react-redux';
import equal from 'fast-deep-equal'
import { addBook, fetchBookDetails, updateBook, getUsersList } from '../store/action/userAndBookAction';
import FormElements from "../Hoc/formElement";
import { Dimmer, Loader, Modal, Button } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { titleOfBook, authorOfBook, descriptionOfBook, statusOfBook, seller, bookPrice, discountRate } from './../constant/constant';
import { Form } from "semantic-ui-react";
const initialFormObj = {
  // id: "",
  author: "",
  description: "",
  discount: "",
  price: "",
  status: "",
  title: "",
  // isOpen: false,
  userType: "",
  uid: ""
}

const initialFormErrors = {
  author: [{required: false}],
  description: [{ required:false}],
  discount: [{required: false}],
  price: [{ required:false}],
  status: [{required: false}],
  title: [{ required:false}],
  userType: [{required: false}],
  uid: [{ required:false}],
};

class AddBook extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
          isOpen: false,
        }
    }

    submitBook = (type) => {
      const { data } = this.props;
          if(type === 'add') {
            this.props.addBook(data);
          } else {
            this.props.updateBook(data);
          }
          this.setState({ isOpen : false });
          this.props.history.goBack();
    }

    checkNumericNew = (event) => {
      if (!((event.key >= '0' && event.key <= '9') || event.key === 'Delete' || event.key === 'Backspace' || event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        event.preventDefault();
      }
    }

    componentDidMount() {
      this.props.getUsersList();
      if(this.props.match.params.id) {
        this.props.fetchBookDetails(this.props.match.params.id);
    }
    }

    componentWillReceiveProps(nextProps) {
      const { data, smartElement } =this.props;
      let isAdd = localStorage.getItem('isEdit');
      if (isAdd !== 'add' && nextProps.bookDetail) {
        if(data.title === "") {
          smartElement.bindValues(nextProps.bookDetail);
        }
      }
    }

    componentDidUpdate(prevProps) {
      let isAdd = localStorage.getItem('isEdit');
      if(!equal(this.props.bookDetail, prevProps.bookDetail) && isAdd !== 'add')
      {
        const { smartElement } =this.props;
        this.props.fetchBookDetails(this.props.match.params.id);
        smartElement.bindValues(this.props.bookDetail);
      }
    } 

    handleSubmit = () => {
      const { smartElement } = this.props;
      const isEdit = localStorage.getItem('isEdit');
      const val = smartElement.isFormValid1();
      if(isEdit === 'edit') {
        this.setState({ isOpen : true });
      }
      if (!val.includes(false)) {
        this.setState({ isOpen : true });
      }
    }

    isReadOnly = () => {
      const isEdit = localStorage.getItem('isEdit');
      return isEdit === 'view'
    }

    errorHandle = (type, isData, data) => {
    const { smartElement } = this.props;
     return data && smartElement.stateData.isDirtyForm && isData.length ? isData.some(r=>r["required"]) ? false : `${type} is Required` : false
    }

    render(){
        let userData = [];
        const isEdit = localStorage.getItem('isEdit');
        const id = localStorage.getItem('uid');
        const { smartElement, data, formErrors } = this.props;

        if(this.props.userList) {
            this.props.userList.map((data) => {
              if(data.uid === id && data.userType === 'seller') {
                userData.push({ key: data.uid, value: `${data.uid} ${data.userType}`, text: `${data.firstName} ${data.lastName}` });
              }
          });
          
          if(userData.length === 0) {this.props.userList.forEach((data) => {
            if(data.userType === 'seller') {
              userData.push({ key: data.uid, value: `${data.uid} ${data.userType}`, text: `${data.firstName} ${data.lastName}` });
            }
          });
        }
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
        console.log("books: ", this.props.bookDetail);

        return(
        <>
            {this.props.match.params.id ? (isEdit === 'view' ? <h1> Book </h1>: <h1>Edit Book </h1>) : <h1>Add Book</h1>}
            <Form style={{ margin: "0 auto", width: '80%' }}>
              <Form.Group widths='equal'>
                {smartElement.formFieldElement({...titleOfBook, value: data.title,
                    readOnly: this.isReadOnly(), error: this.errorHandle('title', formErrors.title, !data.title) })}                
                {smartElement.formFieldElement({...authorOfBook, value: data.author,
                    readOnly: this.isReadOnly(), error: this.errorHandle('author', formErrors.author, !data.author) })}
              </Form.Group>
              {smartElement.formFieldTextElement({...descriptionOfBook,value: data.description,
                  readOnly: this.isReadOnly(), error: this.errorHandle('description', formErrors.description, !data.description) })}
                           <Form.Group widths='equal'>
                {smartElement.selectElement({...statusOfBook, value: data.status,
                    options:dropdown, disabled: this.isReadOnly(), error: this.errorHandle('status', formErrors.status, !data.status) })}
                {smartElement.selectElement({...seller,value: `${data.uid} ${data.userType}`,
      options:userData, disabled: this.isReadOnly(), error: !data.uid && !data.userType && smartElement.stateData.isDirtyForm &&  formErrors.uid.length ? formErrors.uid.some(r=>r["required"]) ? false : 'Seller Type is Required' : false && formErrors.userType.length ? formErrors.userType.some(r=>r["required"]) ? false : 'Seller Type is Required' : false })}
              </Form.Group>
              <Form.Group widths='equal'>
                {smartElement.formFieldElement({...bookPrice, value: data.price,
                      readOnly: this.isReadOnly(), onKeyDown: this.checkNumericNew, error: this.errorHandle('price', formErrors.price, !data.price) })} 
                {smartElement.formFieldElement({...discountRate, value: data.discount, 
                      readOnly: this.isReadOnly(), onKeyDown: this.checkNumericNew,
                      error: this.errorHandle('discount', formErrors.discount, !data.discount) })} 
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
                // disabled={ this.state.author === '' || this.state.description === '' || this.state.price === '' || this.state.status === '' || this.state.title === '' || this.state.discount === '' || user === 'admin' && (this.state.uid === '' || this.state.userType === '')}
                onClick={() => this.handleSubmit()}
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

export default (FormElements((connect(mapStateToProps, mapDispatchToProps)(withRouter(AddBook))), initialFormObj, initialFormErrors));
