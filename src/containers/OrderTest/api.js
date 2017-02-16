/**
 * Returns a list of test.
 * @return {Object[]} json Currently returns an array of test panel object - including id and label
 */
export function getTestList() {
  return fetch(`${process.env.REACT_APP_BASE_URL}/tests`)
    .then((response) => response.json())
    .then((json) => json.data);
}

/**
 * Return a test panel and all its associated data.
 * @param {string} testId A test Id for retriving the panel's full info.
 * @return {Object} json Currently returns an array of tests ID 
 */
export function getTest(testId) {
  return fetch(`${process.env.REACT_APP_BASE_URL}/tests/${testId}`)
    .then((response) => response.json())
    .then((json) => json.data);
}