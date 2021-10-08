import React from 'react';
import { connect } from 'react-redux';
import { addBook, fetchBookDetails, updateBook } from '../store/action/userAndBookAction';
import FormElements from "../Hoc/formElement";
import { Dimmer, Loader, Modal, Button } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { Form, Input, TextArea } from "semantic-ui-react";
class AddBook extends React.Component {
    constructor(props){
        super(props);
        this.state={
            id: "",
            addedBy: "",
            author: "",
            description: "",
            discount: 0,
            price: "",
            status: "",
            title: "",
            isOpen: false
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSelect = () => {
      console.log("event: ", );
      if(this.state.status === 'PENDING') {
        this.setState({ status: 'PUBLISHED' });
      } else {
        this.setState({ status: 'PENDING' });
      }
    }

    submitBook = (type) => {
        let user = localStorage.getItem('typeOfUser');
        this.setState({ addedBy: user });
        if(this.state.addedBy !== '') {
          if(type === 'add') {
            console.log("this.state: ", this.state);
            this.props.addBook(this.state);
          } else {
            this.props.updateBook(this.state);
          }
          if(this.props.isUpdated || this.props.bookStatus) {
            this.setState({ isOpen : false });
            this.props.history.goBack();
          }
    }
  }

  checkNumericNew = (event) => {
    if (!((event.key >= '0' && event.key <= '9') || event.key === 'Delete' || event.key === 'Backspace' || event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      event.preventDefault();
    }
  }

    componentDidMount() {
      if(this.props.match.params.id) {
        this.props.fetchBookDetails(this.props.match.params.id);
      if(this.props.bookDetail) {
      const updateTitle = this.state.title !== "" ? this.state.title : this.props.bookDetail.title;
      const updateDescription = this.state.description !== "" ? this.state.description : this.props.bookDetail.description;
      const updateAuthor = this.state.author !== "" ? this.state.author : this.props.bookDetail.author;
      const updateStatus = this.state.status !== "" ? this.state.status : this.props.bookDetail.status;
      const updatePrice = this.state.price !== "" ? this.state.price : this.props.bookDetail.price;
      const updateId = this.state.id !== "" ? this.state.id : this.props.bookDetail.id;

      this.setState({ title: updateTitle, description: updateDescription, status: updateStatus, author: updateAuthor, price: updatePrice, id: updateId });
      }
    }
    }
    

    render(){
        const dropdown = [
            { key: 'pend', value: 'PENDING', text: 'Pending' },
            { key: 'publish', value: 'PUBLISHED', text: 'Published' },
          ]
        
          if(this.props.match.params.id && !this.props.bookDetail) {
            return (
            <Dimmer active>
                <Loader size='medium'>Loading</Loader>
              </Dimmer>
            )
        }

        const isEdit = localStorage.getItem('isEdit');
        const { title, description, author, status, price  } = this.state;

        return(
        <React.Fragment>
            {this.props.match.params.id ? (isEdit === 'view' ? <h1> Book </h1>: <h1>Edit Book </h1>) : <h1>Add Book</h1>}
            <Form style={{ margin: "0 auto", width: '80%' }}>
               <Form.Field
                  id='form-input-control-first-name'
                  control={Input}
                  label='Title'
                  placeholder='Title'
                  name='title'
                  onChange={this.handleChange}
                  value={title}
                  readOnly={isEdit === 'view' ? true : false}
                  required
                />
              <Form.Field
                id='form-input-control-last-name'
                control={Input}
                label='Author'
                placeholder='Author'
                name='author'
                onChange={this.handleChange}
                value={author}
                required
                readOnly={isEdit === 'view' ? true : false}
               />
              <Form.Field
                id='form-textarea-control-opinion'
                control={TextArea}
                label='Description'
                placeholder='Description'
                name='description'
                onChange={this.handleChange}
                value={description}
                required
                // error={description === ''}
                readOnly={isEdit === 'view' ? true : false}
                />
              <Form.Group widths='equal'>
                <Form.Select
                  fluid
                  label='Status'
                  options={dropdown}
                  name="status"
                  placeholder='Status'
                  value={status}
                  id="status"
                  onChange={this.handleSelect}
                  required
                  disabled={isEdit === 'view' ? true : false}
                />   
                <Form.Field
                  id='form-input-control-first-name'
                  control={Input}
                  label='Price'
                  placeholder='Price'
                  name='price'
                  onChange={this.handleChange}
                  value={price}
                  required
                  onKeyDown={this.checkNumericNew}
                  readOnly={isEdit === 'view' ? true : false}
                />
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
              </Form.Group>
              {(!this.props.match.params.id || (this.props.match.params.id && isEdit) !== 'view') && <Form.Button
                // type='submit'
                color='twitter'
                disabled={ this.state.author === '' || this.state.description === '' || this.state.price === '' || this.state.status === '' || this.state.title === '' }
                onClick={() => this.setState({ isOpen : true })}
                >{this.props.match.params.id && isEdit === 'edit' ? 'Edit Book' : 'Add Book'}</Form.Button>}
            </Form>
        </React.Fragment>
        )
    }
}

const mapDispatchToProps =(dispatch) => {
    return {
        addBook: (bookDetails)  => dispatch(addBook(bookDetails)),
        fetchBookDetails: (id) => dispatch(fetchBookDetails(id)),
        updateBook: (bookDetail) => dispatch(updateBook(bookDetail))
    }
}

const mapStateToProps = (state) => {
    return {
      bookStatus: state.book.bookStatus,
      isUpdated: state.book.isUpdated,
      bookDetail: state.book.bookDetail
    }
  }

export default FormElements(withRouter(connect(mapStateToProps, mapDispatchToProps)(AddBook)));