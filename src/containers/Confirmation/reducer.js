export function initData(data, latestRequestID, createdDateTime) {
  var state = {
    form: data,
    print: null
  }
  state.form = Object.assign({}, state.form, {
    latestRequestID: latestRequestID,
    createdDateTime: createdDateTime
  });
  return Object.assign({}, state);
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