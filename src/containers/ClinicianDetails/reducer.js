import validator from './../../components/validator';
import Immutable from 'immutable';

export function initialState() {
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
      email: 'required email',
    },
    validated: false
  };
  
  // This validates the data in the initial state.
  state.validation = {};
  for (var field in state.validationRule) {
    if(field) {
      state.validation[field] = validator(state.form[field], state.validationRule[field]);
    }
  }
  
  return Object.assign({}, state);
}

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
 * Set "validated" state to true - identifying the confirm button is clicked and validation processed.
 * @param {Object} state Targeted state to be changed.
 */
export function validatedToTrue(state) {
  return Object.assign({}, state, {
    validated: true
  });
}

export function addNewHCP(state) {
  const newHCP = Immutable.fromJS({
    additionalFirstName:'',
    additionalLastName:'',
    additionalOrganisation:'',
    additionalEmail:'',
  })

  let additionalForm = state.additionalForm.update('body', body => 
    body.push(newHCP)
  );
  return Object.assign({}, state, {
    additionalForm: additionalForm,
  });
}

export function removeHCP(state, index) {
  let additionalForm = state.additionalForm.update('body', body => 
    body.splice(index, 1)
  );
  return Object.assign({}, state, {
    additionalForm: additionalForm
  });
}

export function setHCPForm(state, target, index) {
  let additionalForm = state.additionalForm.updateIn(['body', index, target.name], value => target.value);
  return Object.assign({}, state, {
    additionalForm: additionalForm
  });
}

export default { 
  initialState,
  setFormData,
  validatedToTrue,
  addNewHCP,
  removeHCP,
  setHCPForm
};