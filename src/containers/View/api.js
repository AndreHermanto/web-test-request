/**
 * Returns the test request based on id
 * @return {Object[]} json Currently returns an array of test panel object - including id and label
 */
export function getTestRequestById(id, username, password) {
  return fetch(`${process.env.REACT_APP_BASE_URL}/test-requests/${id}`, {
      headers: {
        Authorization: 'Basic ' + btoa(username + ':' + password)  
      }
    })
    .then((response) => response.json())
    .then((json) => json.data);
}

/**
 * Returns the test request based on firstname, lastname and dob
 * @return {Object[]} json Currently returns an array of test panel object - including id and label
 */
export function getTestRequestByPatientInfo(firstName, lastName, dob, username, password) {
  return fetch(`${process.env.REACT_APP_BASE_URL}/test-requests?firstName=${firstName}&lastName=${lastName}&dob=${dob}`, {
      headers: {
        Authorization: 'Basic ' + btoa(username + ':' + password)  
      }
    })
    .then((response) => response.json())
    .then((json) => json.data);
}