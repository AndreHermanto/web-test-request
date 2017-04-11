import validator from './../../components/validator';

export function initData(prefilled, familyHistory) {
  var state = {
    form: {
      clinicalInfo: '',
      affected: false,
      relevantInvestigation: '',
      familyHistory: '',
      consanguinity: false,
      consanguinityInfo:''
    },
    validationRule: {
      clinicalInfo: 'required'
    },
    validated: false,
    formId: 'familyMemberClinicalInfo'
  };
  
  if(prefilled && Object.keys(prefilled).length !== 0) state.form = prefilled;
  if(familyHistory) state.form.familyHistory = familyHistory;
  
  // Detects affected state to determine whether clinical information state needs to be validated
  state.validationRule.clinicalInfo = state.form.affected ? 'required' : '';
  
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
 * This sets the form data upon onChange.
 * @param {Object} state Targeted state to be changed.
 * @param {Object} target Target object captured from UI event change.
 */
export function setFormData(state, target) {
  var value, formStateChild;

  switch(target.type) {
    case 'checkbox':
      value = target.checked;
      break;
    default:
        value = target.value;
      break;
  } 

  if(value === false && target.name === 'consanguinity') {
    formStateChild = Object.assign({}, state.form, {
      [target.name]: value,
      consanguinityInfo: ''
    });
  }
  else {
    formStateChild = Object.assign({}, state.form, {
      [target.name]: value
    });
  }
  
  var validationStateChild = Object.assign({}, state.validation, {
    [target.name]: validator(value, state.validationRule[target.name])
  });

  
  // Affected state will change the clinical info's validation
  if(target.name === 'affected') {
    var newValidationRule = Object.assign({}, state.validationRule, {
      clinicalInfo: value ? 'required' : ''
    });
    
    validationStateChild = Object.assign({}, validationStateChild, {
      clinicalInfo: validator(state.form.clinicalInfo, newValidationRule.clinicalInfo)
    });
    
    return Object.assign({}, state, {
      form: formStateChild,
      validationRule: newValidationRule,
      validation: validationStateChild
    });
  } else {
    return Object.assign({}, state, {
      form: formStateChild,
      validation: validationStateChild
    });
  }
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