/**
 * Returns an invoice. 
 */
export function getInvoice(user) {
  return fetch(`${process.env.REACT_APP_BASE_URL}/test-requests?id=${user.id}`)
    .then((response) => response.json())
    .then((json) => json.data);
}
