export function initData(props) {
  var state = {
    form: {},
    print: null
  }
  return Object.assign({}, state);
}

/**
 * After making a api call, populate the form, id and date fields.
 * @param {Object} state Targeted state to be changed.
 * @param {Object} data Retrieved data to be added.
 */
export function setRetrievedData(state, data) {
  return Object.assign({}, state, {
    form: data,
  });
}


/**
 * Set "print" state to determine which type of report to print.
 * @param {Object} state Targeted state to be changed.
 * @param {Integer} value Value to be set.
 */
export function setPrintType(state, value) {
  return Object.assign({}, state, {
    print: value
  });
}