import validator from './../../components/validator';

export function initData(){
  var state = {
    form:{
      phone: "",
      lastName: ""
    },
    validationRule: {
      phone: 'required number',
      lastName: 'required'
    },
    validated: false,
    authenticated: true
  }
    
    // This validates the data in the initial state.
    state.validation = {};
    for (var field in state.validationRule) {
      if(field) {
        state.validation[field] = validator(state.form[field], state.validationRule[field]);
      }
    }
    
    return Object.assign({}, state);
}

/**
 * setFormState
 */
export function setFormState(state, target) {
  var value;
  switch(target.type) {
    case 'checkbox':
      value = target.checked;
      break;
    default:
      value = target.value;
      break;
  } 
  
  var formStateChild = Object.assign({}, state.form, {
    [target.name]: value
  });
  
  var validationStateChild = Object.assign({}, state.validation, {
    [target.name]: validator(value, state.validationRule[target.name])
  });

  return Object.assign({}, state, {
    form: formStateChild,
    validation: validationStateChild
  });
}

/**
 * Set "validated" state to true - identifying the confirm button is clicked and validation processed.
 * @param {Object} state Targeted state to be changed.
 */
export function validatedToTrue(state) {
  return Object.assign({}, state, {
    validated: true
  });
}

/**
 * Set "authenticated" state to false - identifying the confirm button is clicked and user is valid.
 * @param {Object} state Targeted state to be changed.
 */
export function authenticatedToFalse(state) {
  return Object.assign({}, state, {
    authenticated: false
  });
}