import React from 'react';
import { Input, Radio } from 'semantic-ui-react';

const formInput =(props) => {
  
    return(
        <Input type = { props.type } 
            iconPosition = 'left' 
            validators = {["required"]}
            errorMessages = {["Field Required"]}
            placeholder = { props.placeholder }
            value = { props.value}
            onChange = { props.onChange }
            icon = { props.icon }
            name = { props.name }
        >    
        </Input>
    )
}

const radioInput =(props) => {
  
    return(
        <Radio
            label = { props.label }
            name = { props.name }
            value = { props.value }
            checked = { props.checked }
            onChange = { props.onChange }
        />
    )
}

const formData ={
    formInput : formInput,
    radioInput: radioInput
}

export default (HocComponent) => {
    return function wrappedRender(args){
        return <HocComponent {...formData}/>
    }
}