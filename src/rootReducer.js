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
 * This overrides the gene list.
 * @param {Object} state Targeted state to be changed.
 * @param {string[]} list List of disorders.
 */
export function setGeneList(state, list) {
  return Object.assign({}, state, { 
    geneList: list 
  });
}

/**
 * This sets the form data upon onChange.
 * @param {Object} state Targeted state to be changed.
 * @param {string} name Name of the child in the form state.
 * @param {string} value Value for updating.
 */
export function setFormData(state, name, value) {
  var formStateChild = Object.assign({}, state.form, {
    [name]: value
  });
  
  return Object.assign({}, state, {
    form: formStateChild
  });
}