import validator from './../../components/validator';

export function initData(prefilled) {
  var state = {
    form: {
      lastName: '',
      firstName: '',
      dob: '',
      medicalRecordNo: '',
      gender: 'Unknown',
      genderOther: '',
      ethnicity: '',
      deceased: false,
      sampleSource: '',
      consent: false,
      email: ''    
    },
    validationRule: {
      lastName: 'required',
      firstName: 'required',
      dob: 'required',
      consent: 'consentTrue',
      email: 'required email'
    },
    validated: false,
    formId: 'FamilyMemberDetails'
  };
  
  if(prefilled && Object.keys(prefilled).length !== 0) state.form = prefilled;

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