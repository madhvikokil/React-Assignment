import React from 'react';
import { Input, Radio, Form, TextArea } from 'semantic-ui-react';

const formInput =(props) => {
  
    return(
        <Input
            type={props.type} 
            iconPosition='left' 
            validators={["required"]}
            errorMessages={["Field Required"]}
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

const formData ={
    formInput : formInput,
    radioInput: radioInput,
    formFieldElement: formFieldElement,
    formFieldTextElement: formFieldTextElement,
    selectElement: selectElement
}

export default (HocComponent) => {
    return function wrappedRender(args){
        return <HocComponent {...formData}/>
    }
}