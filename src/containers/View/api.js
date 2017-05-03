/**
 * Returns the test request based on id (Need a way to mock typical xhr call)
 * @return {Object[]} json Currently returns an array of test panel object - including id and label
 */
export function getTestRequestById(id, username, password) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `${process.env.REACT_APP_BASE_URL}/test-requests/${id}`, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Authorization", `Basic ${btoa(username + ':' + password)}`);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status === 200) {
        var json = JSON.parse(xhr.response);
        resolve(json.data);
      } else resolve({})
    }
  });
}

/**
 * Returns the test request based on firstname, lastname and dob (Need a way to mock typical xhr call)
 * @return {Object[]} json Currently returns an array of test panel object - including id and label
 */
export function getTestRequestByPatientInfo(firstName, lastName, dob, username, password) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `${process.env.REACT_APP_BASE_URL}/test-requests?firstName=${firstName}&lastName=${lastName}&dob=${dob}`, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Authorization", `Basic ${btoa(username + ':' + password)}`);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status === 200) {
        var json = JSON.parse(xhr.response);
        resolve(json.data);
      } else resolve({})
    }
  });
}