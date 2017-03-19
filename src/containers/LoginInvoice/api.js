/**
 * Returns an invoice. 
 */
export function getInvoice(user) {
  return fetch(`${process.env.REACT_APP_BASE_URL}/test-requests?id=${user.id}&lastName=${user.lastName}&phone=${user.phone}`)
    .then((response) => response.json())
    .then((json) => json.data);
}
