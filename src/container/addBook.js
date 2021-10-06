import React from 'react';
import { connect } from 'react-redux';
import { addBook, fetchBookDetails } from '../store/action/userAndBookAction';
import FormElements from "../Hoc/formElement";
import { withRouter } from "react-router-dom";

import { Form, Button, Input, TextArea, Modal } from "semantic-ui-react";
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
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitBook = (e) => {
        e.preventDefault();
        let user = localStorage.getItem('typeOfUser');
        this.setState({ addedBy: user });
        if(this.state.addedBy !== '') this.props.addBook(this.state);
    }

    componentDidMount() {
      this.props.fetchBookDetails(this.props.match.params.id);
      console.log("eeeeeeeeeee");
      if(this.props.bookDetails) {
        console.log("here");
        console.log("this.props.bookDetails: ", this.props);
        this.setState({ title: this.props.bookDetails.title});
      }
    }

    render(){
        const dropdown = [
            { key: 'pend', value: 'PENDING', text: 'Pending' },
            { key: 'publish', value: 'PUBLISHED', text: 'Published' },
          ]

        return(
        <React.Fragment>
            <h1>Add Book</h1>
            <Form style={{ margin: "0 auto", width: '80%' }}>
               <Form.Field
                  id='form-input-control-first-name'
                  control={Input}
                  label='Title'
                  placeholder='Title'
                  name='title'
                  onChange={this.handleChange}
                  // value={this.state.title || this.props.bookDetail.title}
                  required
                />
              <Form.Field
                id='form-input-control-last-name'
                control={Input}
                label='Author'
                placeholder='Author'
                name='author'
                onChange={this.handleChange}
                // value={this.props.bookDetail.author}
                required
               />
              <Form.Field
                id='form-textarea-control-opinion'
                control={TextArea}
                label='Description'
                placeholder='Description'
                name='description'
                onChange={this.handleChange}
                // value={this.props.bookDetail.description}
                required
                />
              <Form.Group widths='equal'>
                <Form.Select
                  fluid
                  label='Status'
                  options={dropdown}
                  name="status"
                  placeholder='Status'
                  onChange={this.handleSelect}
                  // value={this.props.bookDetail.status}
                  required
                />   
                <Form.Field
                  id='form-input-control-first-name'
                  control={Input}
                  label='Price'
                  placeholder='Price'
                  name='price'
                  onChange={this.handleChange}
                  // value={this.props.bookDetail.price}
                  required
                />
              </Form.Group>
              <Form.Button
                // type='submit'
                // disabled={ this.state.id === '' || this.state.author === '' || this.state.description === '' || this.state.price === '' || this.state.status === '' || this.state.title === '' }
                onClick={this.submitBook}
                >Add Book</Form.Button>
            </Form>
        </React.Fragment>
        )
    }
}

const mapDispatchToProps =(dispatch) => {
    return {
        addBook: (bookDetails)  => dispatch(addBook(bookDetails)),
        fetchBookDetails: (id) => dispatch(fetchBookDetails(id))
    }
}

const mapStateToProps = (state) => {
    return {
      bookStatus: state.book.bookStatus,
      bookDetail: state.book.bookDetail
    }
  }

export default FormElements(withRouter(connect(mapStateToProps, mapDispatchToProps)(AddBook)));