var baseURL = `${process.env.REACT_APP_BASE_URL}`;

/**
 * This call returns a list of test.
 * @return {string[]} json Currently returns an array of tests ID 
 */
export function getTestList() {
  return fetch(`${baseURL}/tests`)
    .then(
      (response) => response.json()
    )
    .then(
      (json) => {
        return json.data;
      }
    );
}

/**
 * This call returns a gene list.
 * @return {Object} json Returns a list of disorders 
 */
export function getGeneList(test) {
  return fetch(`${baseURL}/tests/${test}`)
    .then(
      (response) => response.json()
    )
    .then(
      (json) => {
        return json.data.geneLists;
      }
    );
}

/**
 * This call submits the form data.
 * @param {Object} data Form state to be submitted as data.
 * @return {Object} json 
 */
export function submitForm(formData) {
  return fetch(`${baseURL}/tests`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(function(response) {
      if (!response.ok) {
        alert('POST failed');
        return false;
      }
      alert('POST success');
      return response.json();
    }).then(
      (json) => {
        return json.data;
      }
    );
}