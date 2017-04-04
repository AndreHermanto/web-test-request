/**
 * Returns the categorise of test panels including whole genome analysis.
 * @return {Object[]} json Currently returns an array of test panel object - including id and label
 */
export function getPanelsData() {
  return fetch(`${process.env.REACT_APP_BASE_URL}/panel-types`)
    .then((response) => response.json())
    .then((json) => json.data);
}
