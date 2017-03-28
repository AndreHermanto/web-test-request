import validator from './../../components/validator';
/**
 * initialState for clinician details form
 */
export function initialState(prefilled) {
  var state = {
    form: {
      providerNumber:'',
      medicalSpecialty:'',
      firstName: '',
      lastName: '',
      organisation:'',
      phone: '',
      email: '',
      fax:'',
      copyToHCP:[],
      copy:false    
    },
    validationRule: {
      providerNumber:'id',
      medicalSpecialty:'required',
      firstName: 'required',
      lastName: 'required',
      organisation:'required',
      phone:'required',
      email: 'required email'
    },
    validationCopyHCPRule: {
      firstName: 'required',
      lastName: 'required',
      organisation: 'required',
      email: 'required email'
    },
    validated: false,
    formId: 'clinicianDetailsModule'
  };

  if(prefilled && Object.keys(prefilled).length !== 0) state.form = prefilled;
  
  // This validates the data in the initial state.
  state.validation = {};
  for (var field in state.validationRule) {
    if(field) {
      state.validation[field] = validator(state.form[field], state.validationRule[field]);
    }
  }
  
  //This initialise validation copy to HCP fields.
  state.validationCopyHCP = [];
  state.form.copyToHCP.forEach((copyHCP) => {
    var newHCPValidation = {};
    for (var field in state.validationCopyHCPRule) {
      if(field) {
        newHCPValidation[field] = validator(copyHCP[field], state.validationCopyHCPRule[field]);
      }
    }
    state.validationCopyHCP.push(newHCPValidation);
  });
  
  return Object.assign({}, state);
}

/**
 * This sets the form data upon onChange.
 * @param {Object} state Targeted state to be changed.
 * @param {Object} target Target object captured from UI event change.
 */
export function setFormData(state, target) {

  var formStateChild = Object.assign({}, state.form, {
    [target.name]: target.value
  });
  
  var validationStateChild = Object.assign({}, state.validation, {
    [target.name]: validator(target.value, state.validationRule[target.name])
  });

  return Object.assign({}, state, {
    form: formStateChild,
    validation: validationStateChild
  });
}

/**
* add new HCP copy
* unlimited copy 
*/
export function addNewHCP(state, HCPArray) {
  const newHCP = {
    firstName:'',
    lastName:'',
    organisation:'',
    email:''
  }
  
  var newHCPValidation = {};
  for (var field in state.validationCopyHCPRule) {
    if(field) {
      newHCPValidation[field] = validator(newHCP[field], state.validationCopyHCPRule[field]);
    }
  }
  
  var newArray = HCPArray || [];
  newArray.push(newHCP);
  
  var newValidationArray = state.validationCopyHCP.slice();
  newValidationArray.push(newHCPValidation);
  
  var formStateChild = Object.assign({}, state.form, {
    copyToHCP: newArray
  });
  
  return Object.assign({}, state, {
    form: formStateChild,
    validationCopyHCP: newValidationArray
  });
}

/**
 * remove selected HCP copy base on it index 
 */
export function removeHCP(state, HCPArray, index) {
  var newArray = HCPArray || [];
  newArray.splice(index, 1);
  
  var newValidationArray = state.validationCopyHCP.slice();
  newValidationArray.splice(index, 1);

  var formStateChild = Object.assign({}, state.form, {
    copyToHCP: newArray
  });
  
  return Object.assign({}, state, {
    form: formStateChild,
    validationCopyHCP: newValidationArray
  });
}

/**
 * This sets the form data upon onChange for immutable form.
 * make change to form field base on index and target name
 */

export function setHCPForm(state, HCPArray, target, index) {
  var newArray = HCPArray || [];
  newArray[index][target.name] = target.value;
  
  var newValidationArray = state.validationCopyHCP.slice();
  newValidationArray[index][target.name] = validator(newArray[index][target.name], state.validationCopyHCPRule[target.name]);
  
  var formStateChild = Object.assign({}, state.form, {
    copyToHCP: newArray
  });
  
  return Object.assign({}, state, {
    form: formStateChild,
    validationCopyHCP: newValidationArray
  });
}

/**
* submit button validation before moving to next step
* Set copyToHCP to empty array in case validation is fail
* Check if user request a copy HCP
* set validated to true and move to next step
*/
export function validateClinicianForm(state) {
  return Object.assign({}, state, {
    validated: true,
    form: state.form
  });
}
