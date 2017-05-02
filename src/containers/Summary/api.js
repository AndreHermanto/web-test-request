import download from 'downloadjs';

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


/**
 * Download the attachment (Can't be mocked for testing)
 * @param {String} fileId Id of a file,
 */
export function downloadAttachment(fileId, fileName) {
  return fetch(`${process.env.REACT_APP_BASE_URL}/attachments/${fileId}`, {
    method: 'GET'
  })
  .then((response) => response.blob())
  .then((blob) => {
    download(blob, fileName);
  }); 
}
