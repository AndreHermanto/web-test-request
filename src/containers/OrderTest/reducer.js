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

/**
 * This sets a category
 * @param {Object} state Targeted state to be changed.
 * @param {String} categoryState Choose between chosenMainCategory or chosenSubCategory to be changed.
 * @param {string} value Value for updating.
 */
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
 * @param {string} panel Value for updating.
 */
export function setPanel(state, panel) {
  var formStateChild = Object.assign({}, state.form, {
    "test": {
      id: panel.id,
      label: panel.label,
      geneLists: panel.geneLists ? [panel.geneLists[panel.geneLists.length - 1]] : []
    }
  });
  
  var validationStateChild = Object.assign({}, state.validation, {
    test: validator(panel, state.validationRule['test'])
  });
  
  return Object.assign({}, state, {
    form: formStateChild,
    validation: validationStateChild
  });
}

/**
 * Set the type of the test panel.
 * @param {Object} state Targeted state to be changed.
 * @param {string} name Name of the child in the form state.
 * @param {string} panel Value for updating.
 */
export function setPanelType(state, panelType) {
  var formStateChild = Object.assign({}, state.form, {
    "test": {
      id: state.form.test.id,
      label: state.form.test.label,
      geneLists: [panelType]
    }
  });
  
  return Object.assign({}, state, {
    form: formStateChild
  });
}

/**
 * This is a shorthand of using combination of setCategory and setPanel for changing the main category.
 * @param {Object} state Targeted state to be changed.
 * @param {string} value Value for updating.
 */
export function setNewMainCategory(state, category) {
  var newState = Object.assign({}, state);
  newState = setPanel(newState, {});
  newState = setCategory(newState, 'chosenPanelSubCategory', {});
  newState = setCategory(newState, 'chosenPanelMainCategory', category);

  // This is made for special case that if there is only 1 sub-category with 1 panel, it'll auto-select them.
  if(newState.chosenPanelMainCategory.categories.length === 1) {
    newState = setCategory(newState, 'chosenPanelSubCategory', newState.chosenPanelMainCategory.categories[0]);
    newState = setPanel(newState, newState.chosenPanelSubCategory.panels[0])
  }

  return newState;
}

/**
 * This is a shorthand of using combination of setCategory and setPanel for changing the sub category.
 * @param {Object} state Targeted state to be changed.
 * @param {string} value Value for updating.
 */
export function setNewSubCategory(state, value) {
  var newState = Object.assign({}, state);
  newState = setPanel(newState, {});
  newState = setCategory(newState, 'chosenPanelSubCategory', value);
  return newState;
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