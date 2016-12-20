var baseURI = "http://localhost:3721/";

/**
 * This call returns a list of test.
 * @return {string[]} json Currently returns an array of tests ID 
 */
export function getTestList() {
  return fetch(`${baseURI}v1/testrequest/tests`)
    .then(
      (response) => response.json()
    )
    .then(
      (json) => {
        return json;
      }
    );
}

/**
 * This call returns a gene list.
 * @return {Object} json Returns a list of disorders 
 */
export function getGeneList(test) {
  return fetch(`${baseURI}v1/testrequest/test/${test}`)
    .then(
      (response) => response.json()
    )
    .then(
      (json) => {
        return json.genelists;
      }
    );
}

/**
 * This call submits the form data.
 * @param {Object} data Form state to be submitted as data.
 * @return {Object} json 
 */
export function submitForm(data) {
  return fetch(`${baseURI}v1/testrequest/tests`, {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(function(response) {
      if (!response.ok) {
        alert('POST failed');
        return false;
      }
      alert('POST success');
      return response.json();
    }).then(
      (json) => {
        return json;
      }
    );
}