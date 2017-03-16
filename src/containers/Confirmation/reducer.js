export function initData() {
  var state = {
    print: null
  }
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