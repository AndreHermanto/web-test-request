/**
 * Upload an attachment
 * @param {Object} data Test request data to be submitted.
 */
export function upload(file) {
  var formData = new FormData();
  formData.append('file', file);
  return fetch(`${process.env.REACT_APP_BASE_URL}/attachments`, {
    method: 'POST',
    body: formData
  }).then((response) => response.json() );
}
