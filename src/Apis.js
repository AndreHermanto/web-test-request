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