import validator from './../../components/validator';

export function initData(prefilled) {
  var state = {
    form: {
      test: {}
    },
    testList: [],
    validationRule: {
      test: 'requireSelect',
    },
    validated: false,
    formId: 'orderTestModule'
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
 * This overrides the test list.
 * @param {Object} state Targeted state to be changed.
 * @param {string[]} list List of tests.
 */
export function setTestList(state, list) {
  return Object.assign({}, state, { 
    testList: list,
    formId: 'orderTestModule'
  });
}

/**
 * This sets the test type.
 * @param {Object} state Targeted state to be changed.
 * @param {string} name Name of the child in the form state.
 * @param {string} value Value for updating.
 */
export function setTestType(state, value) {
  var formStateChild = Object.assign({}, state.form, {
    "test": value
  });
  
  var validationStateChild = Object.assign({}, state.validation, {
    test: validator(value, state.validationRule['test'])
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