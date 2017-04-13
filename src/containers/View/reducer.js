import validator from './../../components/validator';

export function initData() {
  var state = {
    form: {
      searchBy:'Test Request Id',
      testRequestId:'',
      lastName: '',
      firstName: '',
      dob: ''
    },
    testRequestData: {},
    testRequestList: [],
    validationRule: {
      testRequestId: 'required',
      lastName: 'required',
      firstName: 'required',
      dob: 'requiredDate'
    },
    validated: false,
    formId: 'ViewModule'
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

/**
 * This sets the form data upon onChange.
 * @param {Object} state Targeted state to be changed.
 * @param {Object} target Target object captured from UI event change.
 */
export function setFormData(state, target) {
  var value = target.value;
  
  var formStateChild = Object.assign({}, state.form, {
    [target.name]: value
  });
  
  var validationStateChild = Object.assign({}, state.validation, {
    [target.name]: validator(value, state.validationRule[target.name])
  });

  return Object.assign({}, state, {
    form: formStateChild,
    validation: validationStateChild,
    validated: false
  });
}

/**
 * This sets testRequestList state.
 * @param {Object} state Targeted state to be changed.
 * @param {Object[]} list A list of test request data pulled from the backend
 */
export function setTestRequestList(state, list) {
  return Object.assign({}, state, {
    testRequestList: list
  });
}

/**
 * Set "validated" state to true - identifying the confirm button is clicked and validation processed.
 * @param {Object} state Targeted state to be changed.
 */
export function validatedToTrue(state) {
  return Object.assign({}, state, {
    validated: true,
    testRequestList: []
  });
}