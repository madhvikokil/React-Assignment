import React from 'react';
import { Input, Radio, Form, TextArea } from 'semantic-ui-react';

const formInput = (props) => {
    const changeHandler = (e) => {
        return [e.target.name] = e.target.value
    }
    return(
        <Input
            type={props.type} 
            iconPosition={props.iconPosition}
            value={props.value}
            onChange={changeHandler}
            ref={props.ref}
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

const validation = (props, type) => {
    const errorMessages = [];
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(type === 'login' && (props.email === '' || props.password === '') || type === 'signup' &&
    (props.email === '' || props.password === ''|| props.firstName === '' || props.lastName === '')) {
        errorMessages.push('Enter the fields');
        return errorMessages;
    }
    let emailRegexCheck = emailRegex.test(String(props.email));
    if(!emailRegexCheck) errorMessages.push("Invalid email address");

    let passwordRegexTest = props.password.length > 6;
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
        return <HocComponent formData={formData}/>
    }
}