import validator from './../../components/validator';
import Immutable from 'immutable';
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
    additionalForm:Immutable.fromJS({
      body: []
    }),
    validationRule: {
      providerNumber:'required',
      medicalSpecialty:'required',
      firstName: 'required',
      lastName: 'required',
      organisation:'required',
      phone:'required',
      email: 'required email'
    },
    validated: false,
    formId: 'ClinicianDetails'
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
* add new HCP copy form field to additionalForm state
* unlimited copy 
*/
export function addNewHCP(state) {
  const newHCP = Immutable.fromJS({
    additionalFirstName:'',
    additionalLastName:'',
    additionalOrganisation:'',
    additionalEmail:''
  })

  let additionalForm = state.additionalForm.update('body', body => 
    body.push(newHCP)
  );
  return Object.assign({}, state, {
    additionalForm: additionalForm
  });
}

/**
* remove selected HCP copy base on it index 
*/
export function removeHCP(state, index) {
  let additionalForm = state.additionalForm.update('body', body => 
    body.splice(index, 1)
  );
  return Object.assign({}, state, {
    additionalForm: additionalForm
  });
}

/**
 * This sets the form data upon onChange for immutable form.
 * make change to form field base on index and target name
 */

export function setHCPForm(state, target, index) {
  let additionalForm = state.additionalForm.updateIn(['body', index, target.name], value => target.value);
  return Object.assign({}, state, {
    additionalForm: additionalForm
  });
}

/**
* submit button validation before moving to next step
* Set copyToHCP to empty array in case validation is fail
* Check if user request a copy HCP
* if yes then transfer it from additionalForm to copyToHCP form state
* set validated to true and move to next step
*/
export function validateClinicianForm(state) {
  let body = state.additionalForm.get('body');
  state.form.copyToHCP = [];
  if(body.size > 0) {
    body.map((b, i)=> {
      let copy = {
        additionalFirstName: b.get('additionalFirstName'),
        additionalLastName: b.get('additionalLastName'),
        additionalOrganisation: b.get('additionalOrganisation'),
        additionalEmail: b.get('additionalEmail')
      }
      return state.form.copyToHCP.push(copy);
    })
  }
  return Object.assign({}, state, {
    validated: true,
    form: state.form
  });
}
