/**
 * Returns a list of test.
 * @return {Object[]} json Currently returns an array of test panel object - including id and label
 */
export function getTestList() {
  return fetch(`${process.env.REACT_APP_BASE_URL}/panels`)
    .then((response) => response.json())
    .then((json) => json.data);
}
