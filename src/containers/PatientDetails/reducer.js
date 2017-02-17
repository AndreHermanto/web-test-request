export function initData() {
  return Object.assign({}, {
    form: {
      lastName: null,
      firstName: null,
      dob: null,
      medicalRecordNo: null,
      gender: null,
      genderOther: null,
      ethnicity: null,
      deceased: false,
      sampleSource: null,
      consent: false,
      email: null    
    },
    validated: false
  });
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
  
  return Object.assign({}, state, {
    form: formStateChild
  });
}