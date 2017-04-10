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

  if(ruleObj.email && !(value || '').match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    validationState.status = 'error';
    validationState.feedback = 'This is not a valid email.';
  }
  
  if(ruleObj.number && isNaN(value)) {
    validationState.status = 'error';
    validationState.feedback = 'This is not a number.';
  }

  if(ruleObj.consentTrue && value === false) {
    validationState.status = 'error';
    validationState.feedback = 'You must have obtained consent from the patient to proceed.';
  }
  
  if(ruleObj.payerConsentTrue && value === false) {
    validationState.status = 'error';
    validationState.feedback = 'You must have obtained consent from the payer to proceed.';
  }

  if(ruleObj.signatureTrue && value === false) {
    validationState.status = 'error';
    validationState.feedback = 'You must sign the electronic signature to submit.';
  }
  
  if(ruleObj.requireSelect && !value.id) {
    validationState.status = 'error';
    validationState.feedback = 'You must select one of above.';
  }

  if(ruleObj.requireSelectNoObj && !value) {
    validationState.status = 'error';
    validationState.feedback = 'You must select one of above.';
  }
  
  if(ruleObj.requiredDate && !value) {
    validationState.status = 'error';
    validationState.feedback = 'This date is not valid.';
  }

  if(ruleObj.required && !value) {
    validationState.status = 'error';
    validationState.feedback = 'This field is required.';
  }

  if(ruleObj.id && (value.length !== 0 && (value.length > 8 || value.length < 6 || isNaN(value.substring(0,value.length - 2)) || !(value.substring(value.length - 3, value.length)).match(/^[a-z0-9]+$/i)))) {
    validationState.status = 'error';
    validationState.feedback = 'This is not a valid provider number.';
  }

  if(ruleObj.familyMember && value.length === 0) {
    validationState.status = 'error';
    validationState.feedback = 'Please add at least one family member.';
  }

  return validationState; 
}