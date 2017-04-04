import validator from './../../components/validator';

export function initData(prefilled) {
  var state = {
    form: {
      test: {}
    },
    panelCategories: [],
    chosenPanelMainCategory: null,
    chosenPanelSubCategory: null,
    validationRule: {
      test: 'requireSelect',
      chosenPanelMainCategory: 'required',
      chosenPanelSubCategory: 'required',
    },
    validated: false,
    formId: 'orderTestModule'
  };

  if(prefilled && Object.keys(prefilled).length !== 0) state.form = prefilled;

  // This validates the data in the initial state.
  state.validation = {};
  state.validation['test'] = validator(state.form['test'], state.validationRule['test']);
  state.validation['chosenPanelMainCategory'] = validator(state.chosenPanelMainCategory !== null ? state.chosenPanelMainCategory.id : '', state.validationRule['chosenPanelMainCategory']);
  state.validation['chosenPanelSubCategory'] = validator(state.chosenPanelSubCategory !== null ? state.chosenPanelSubCategory.id : '', state.validationRule['chosenPanelSubCategory']);

  return Object.assign({}, state);
}


/**
 * This overrides the panels.
 * @param {Object} state Targeted state to be changed.
 * @param {string[]} list List of tests.
 */
export function setPanelsData(state, list) {
  return Object.assign({}, state, { 
    panelCategories: list
  });
}

export function setCategory(state, categoryState, value) {
  var validationStateChild = Object.assign({}, state.validation, {
    [categoryState]: validator(value.id, state.validationRule[categoryState])
  });

  return Object.assign({}, state, {
    [categoryState]: value,
    validation: validationStateChild
  });
}

/**
 * This sets a test panel.
 * @param {Object} state Targeted state to be changed.
 * @param {string} name Name of the child in the form state.
 * @param {string} value Value for updating.
 */
export function setPanel(state, value) {
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