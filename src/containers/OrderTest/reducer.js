/**
 * This overrides the test list.
 * @param {Object} state Targeted state to be changed.
 * @param {string[]} list List of tests.
 */
export function setTestList(state, list) {
  return Object.assign({}, state, { 
    testList: list 
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
    "test": value,
    "genes": value.genes
  });
  
  return Object.assign({}, state, {
    form: formStateChild
  });
}