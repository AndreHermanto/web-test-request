/**
 * Validator service for determining the validation state for react-bootstrap UI.
 * @param {String} value Input value to be validated.
 * @param {String} rule Rule that defines the types of validation to be applied - support multiple validations.
 */
export default function validator(value, rule) {
  var ruleObj = {};
  if(rule) {
    rule.split(' ').map((type) => {
      return ruleObj[type] = true;
    });
  }
  
  var validationState = {
    status: null,
    rule: ruleObj
  }
  
  if(ruleObj.email && !value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    validationState.status = 'error';
    validationState.feedback = 'This is not a valid email.';
  }
  
  if(ruleObj.number && isNaN(value)) {
    validationState.status = 'error';
    validationState.feedback = 'This is not a number.';
  }

  if(ruleObj.required && !value) {
    validationState.status = 'error';
    validationState.feedback = 'This field is required.';
  }

  return validationState; 
}