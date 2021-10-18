import React from 'react';
import { Input, Radio, Form, TextArea } from 'semantic-ui-react';

const formInput = (props) => {

    return(
        <Input
            type={props.type} 
            iconPosition={props.iconPosition}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            icon={props.icon}
            name={props.name}
        >
        </Input>
    )
}

const formFieldElement = (props) => {
    return(
        <Form.Field
            id={props.id}
            control={Input}
            label={props.label}
            placeholder={props.placeholder}
            name={props.name}
            onChange={props.onChange}
            value={props.value}
            readOnly={props.readOnly}
            onKeyDown={props.onKeyDown}
            required={props.required}
            maxLength={props.maxLength}
        />
    )
}

const formFieldTextElement = (props) => {
    return(
        <Form.Field
            id={props.id}
            control={TextArea}
            label={props.label}
            placeholder={props.placeholder}
            name={props.name}
            onChange={props.onChange}
            value={props.value}
            required={props.required}
            readOnly={props.readOnly}
        />
    )
}

const selectElement = (props) => {
    return(
        <Form.Select
            fluid
            label={props.label}
            options={props.options}
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            id={props.id}
            onChange={props.onChange}
            required={props.required}
            disabled={props.disabled}
        />
    )
}

const radioInput =(props) => {
  
    return(
        <Radio
            label={props.label}
            name={props.name}
            value={props.value}
            checked={props.checked}
            onChange={props.onChange}
        />
    )
}

const validation = (email, password) => {
    const errorMessages = [];
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let emailRegexCheck = emailRegex.test(String(email));
    if(!emailRegexCheck) errorMessages.push("Invalid email address");

    let passwordRegexTest = password.length > 6;
    if(!passwordRegexTest) errorMessages.push("Password should be min 6 characters" );

    return errorMessages;
}

const formData ={
    formInput : formInput,
    radioInput: radioInput,
    formFieldElement: formFieldElement,
    formFieldTextElement: formFieldTextElement,
    selectElement: selectElement,
    validation: validation
}

export default (HocComponent) => {
    return function wrappedRender(args){
        return <HocComponent {...formData}/>
    }
}