/**
 * Returns the test request based on id
 * @return {Object[]} json Currently returns an array of test panel object - including id and label
 */
export function getTestRequestById(id) {
  return fetch(`${process.env.REACT_APP_BASE_URL}/test-requests/${id}`)
    .then((response) => response.json())
    .then((json) => json.data);
}
