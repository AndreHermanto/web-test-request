import React from 'react';

var baseURI = "http://localhost:3721/";

/**
 * This call returns a list of test.
 */
export function getTestList() {
  return fetch(baseURI + 'v1/testrequest/tests')
    .then(
      (response) => response.json()
    )
    .then(
      (json) => {
        return json;
      }
    );
}