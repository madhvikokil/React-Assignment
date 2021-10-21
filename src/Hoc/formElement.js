import React from 'react';
import { Radio, Form, Dropdown, Input } from 'semantic-ui-react';
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
     onChange = (event) => {
         this.setState({formValue: {...this.state.formValue,[event.target.name]: event.target.value}});
         this.setState({isDirtyForm: true})
            console.log("state: ", this.state);
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
  
        
    onChangeRadio = (event, {value}) => {
        const user = 'typeOfUser';
        this.setState({formValue: {...this.state.formValue,[user]: value}});
    }
     radioInput = (props) => {
             return (
                 <Form.Radio
                 label={props.label}
                 value={props.value}
                 onChange={(e, result) => this.onChangeRadio(e, result)}
                 checked={props.checked}
                 name={props.name}   
                 usertype={props.usertype} 
                 />)
         }
     dropdown = (props) => {
             return (
                 <Dropdown
                 label={props.label}
                 value={props.value}
                 onChange={props.onChange}
                 name={props.name}   
                 placeholder={props.placeholder}
                 options={props.options} 
                 selection
                 />)
         }
         
     formTextArea = (props) => {
             return (
                 <Form.TextArea
                 name={props.name}  
                 label={props.label}
                 value={props.value}
                 placeholder={props.placeholder}
                 onChange={props.onChange}
               />)
         }
     Validation(email, password) {
             let error = {};
             const regex =
               /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
             if (!email || regex.test(email) === false) {
                 error["email"] = "Please enter valid username.";
             } 
             if(password.length < 6){
                 error["password"] = "Please add at least 6 charachter.";
             }
            return error
         }
         
    // isFormValid = () => {
    //     let array = [];
    //     for (const property in this.state.formErrors) {
    //     const r = this.state.formErrors[property].every(item => !!Object.values(item)[0]);
    //     array.push(r);
          
    //     }
    //     return !array.includes(false)
    // }
    
   // const [formValue, setFormValue] = useState(initialFormValue)
     render() {
         console.log("this.state.formErrors: ", this.isFormValid1);
         console.log("check: ", map(this.state.formErrors, (f) => f));
         console.log("check:2 ", map(this.state.formErrors, (f) => f.every(r => !!Object.values(r)[0])));
         console.log("check:3 ", map(this.state.formErrors, (f) => f.every(r => !!Object.values(r)[0]), (s) => s.some(false)));

        //  console.log("check:2 ", map(this.state.formErrors, (f) => map(f => f)));


        const smartElement = {
            formInput : this.formInput,
            radioInput:this.radioInput,
            dropdown:this.dropdown,
            formTextArea:this.formTextArea,
            validation:this.Validation,
            getValues:()=>this.state.formValue,
            stateData: this.state,
        //    isFormValid: this.isFormValid,
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