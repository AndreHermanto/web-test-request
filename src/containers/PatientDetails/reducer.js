import validator from './../../components/validator';

export function initData(prefilled,billingInfo) {
  var state = {
    form: {
      lastName: '',
      firstName: '',
      dob: '',
      medicalRecordNo: '',
      gender: 'Unknown',
      genderOther: '',
      deceased: false,
      sampleSource: '',
      consent: false
    },
    validationRule: {
      lastName: 'required',
      firstName: 'required',
      dob: 'requiredDate',
      consent: 'consentTrue'
    },
    validated: false,
    formId: 'patientDetailsModule',
    selectedAsPayer: false
  };
  
  if(prefilled && Object.keys(prefilled).length !== 0){
    state.form = prefilled;
    if(state.form.lastName === billingInfo.lastName && state.form.firstName === billingInfo.firstName){
      state.selectedAsPayer = true;
    }
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
 * This sets the form data upon onChange.
 * @param {Object} state Targeted state to be changed.
 * @param {Object} target Target object captured from UI event change.
 */
export function setFormData(state, target, billingInfo) {
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
  
  if(state.selectedAsPayer){
      if(target.name === 'lastName'){
        billingInfo.lastName = value;
      }else if(target.name === 'firstName'){
        billingInfo.firstName = value;
      }
  }

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