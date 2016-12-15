/**
 * This overrides the test list.
 * @param {Object} state Targeted state to be changed.
 * @param {string[]} list List of tests.
 * @return {Object} newTestList New list of tests to be used for setState.
 */
export function setTestList(state, list) {
  const newTestList = state.testList = list;
  return newTestList;
}