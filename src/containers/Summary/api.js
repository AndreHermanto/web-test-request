/**
 * Submit the test request
 * @param {Object} data Test request data to be submitted.
 */
export function submitTestRequest(data) {
  return fetch(`${process.env.REACT_APP_BASE_URL}/test-requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}
