export function validations(rule, value) {

  switch(rule){
    case "required" : return required(value);
    case "email" :  return isValidEmail(value);
    case "password" : return isValidPassword(value);
    default: return true;
    }
  }
  
  
  function required(value) {
    return value !== "" && value !== undefined
  }

  function isValidEmail(value) { 
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!value || regex.test(value) === false) {
        return false;
      }
      return true;
    }

   function isValidPassword(value) {
     if(!value || value.length > 6) return true
    return false
  }
  
  