/**
 * Returns the test request based on id
 * @return {Object[]} json Currently returns an array of test panel object - including id and label
 */
export function getTestRequestById(id, username, password) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `${process.env.REACT_APP_BASE_URL}/test-requests/${id}`, false);
  xhr.withCredentials = true;
  xhr.setRequestHeader("Authorization", `Basic ${btoa(username + ':' + password)}`);
  xhr.send();
  if (xhr.status === 200) {
    var json = JSON.parse(xhr.response);
    return json.data;
  } else return {}
}

/**
 * Returns the test request based on firstname, lastname and dob
 * @return {Object[]} json Currently returns an array of test panel object - including id and label
 */
export function getTestRequestByPatientInfo(firstName, lastName, dob, username, password) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `${process.env.REACT_APP_BASE_URL}/test-requests?firstName=${firstName}&lastName=${lastName}&dob=${dob}`, false);
  xhr.withCredentials = true;
  xhr.setRequestHeader("Authorization", `Basic ${btoa(username + ':' + password)}`);
  xhr.send();
  if (xhr.status === 200) {
    var json = JSON.parse(xhr.response);
    return json.data;
  } else return {}
}