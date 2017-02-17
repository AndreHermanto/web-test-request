/**
 * This sets the form data upon onChange.
 * @param {Object} state Targeted state to be changed.
 * @param {string} name Name of the child in the form state.
 * @param {string} value Value for updating.
 */
export function setFormInputData(state, name, value) {
  var formState = Object.assign({}, state.formInput, {
    [name]: value
  });

  return Object.assign({}, state, {
    formInput: formState
  });
}