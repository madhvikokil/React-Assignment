import React from 'react';
import {  Form, Input, TextArea } from 'semantic-ui-react';
import { validations } from '../utility/validation.js';
import { withRouter } from "react-router-dom";
import { map, some } from 'lodash';

export default function HocComponent(WrappedComponent, initialFormObj = {}, initialFormErrors = {}) {
    return class extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
            formValue: initialFormObj,
            formErrors: initialFormErrors,
            isFormValid: false,
            isDirtyForm: false
            }
        }
    
    bindValues = (data) => {
        console.log("state: ", data);
            this.setState({ formValue: {...data} });
        }
    
    onChange = (event) => {
         this.setState({formValue: {...this.state.formValue,[event.target.name]: event.target.value}});
         this.setState({isDirtyForm: true})
    };
     onBlur = (event, rules) => {

         if(rules.length){

            const valid = rules.map((r)=>({[r]: validations(r,event.target.value)}))
            this.setState({formErrors: {...this.state.formErrors,[event.target.name]: valid}})
         }
    };
         
     formInput = (props) => {
        return (
            <Form.Input
                type={props.type}
                error={props.error}
                iconPosition={props.iconPosition}
                value={props.value}
                onChange={this.onChange}
                onBlur={(e)=>this.onBlur(e,props.rules || [])}
                icon={props.icon}
                name={props.name}
                rules={props.rules}
                {...props}
            >
            </Form.Input>
            )
        }
  
        
    onChangeRadio = (event, {typeOfUser}) => {
        this.setState({formValue: {...this.state.formValue,['typeOfUser']: typeOfUser}});
    }
     radioInput = (props) => {
             return (
                 <Form.Radio
                 label={props.label}
                 value={props.value}
                 onChange={this.onChangeRadio}
                 onBlur={(e)=>this.onBlur(e,props.rules || [])}
                 checked={props.checked}
                 name={props.name}   
                 typeOfUser={props.typeOfUser} 
                 />)
         }
    onSelect = (e, {value}) => {
        if(value === 'PENDING' || value === 'PUBLISHED') this.setState({ formValue: {...this.state.formValue,['status']: value} });
        else this.setState({ formValue: {...this.state.formValue, ['userType']: value.split(" ")[1], ['uid']: value.split(" ")[0] }});
    }
     selectElement = (props) => {
             return (
                 <Form.Dropdown
                 label={props.label}
                 value={props.value}
                 onChange={this.onSelect}
                 onBlur={(e)=>this.onBlur(e,props.rules || [])}
                 name={props.name}   
                 placeholder={props.placeholder}
                 options={props.options} 
                 selection
                 />)
         }
         
         formFieldElement = (props) => {
            return(
                <Form.Field
                    id={props.id}
                    control={Input}
                    label={props.label}
                    name={props.name}
                    onChange={this.onChange}
                    onBlur={(e)=>this.onBlur(e,props.rules || [])}
                    rules={props.rules}
                    value={props.value ? props.value : ''}
                    readOnly={props.readOnly}
                    onKeyDown={props.onKeyDown}
                    required={props.required}
                    maxLength={props.maxLength}
                    {...props}
                />
            )
        }
        formFieldTextElement = (props) => {
            return(
                <Form.Field
                    id={props.id}
                    control={TextArea}
                    label={props.label}
                    name={props.name}
                    onChange={this.onChange}
                    onBlur={(e)=>this.onBlur(e,props.rules || [])}
                    rules={props.rules}
                    value={props.value}
                    required={props.required}
                    readOnly={props.readOnly}
                    {...props}
                />
            )
        }
         
     render() {
        const smartElement = {
            formInput : this.formInput,
            radioInput:this.radioInput,
            selectElement:this.selectElement,
            formFieldTextElement:this.formFieldTextElement,
            formFieldElement: this.formFieldElement,
            // getValues:()=>this.state.formValue,
            stateData: this.state,
            bindValues: this.bindValues,
            isFormValid1:() => map(this.state.formErrors, (f) => f.every(r => !!Object.values(r)[0]))
           
        }
        const formMeta = {
            smartElement,
            formErrors:this.state.formErrors,
            data:this.state.formValue
        }
        return <WrappedComponent {...formMeta} />
     }
    }
}