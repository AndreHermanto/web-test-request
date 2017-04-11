/**
 * Returns the pricing based on query strings - panelId, payer and familyExtras
 * @return {Object[]} json Currently returns an array of test panel object - including id and label
 */
export function getPricing(panelId, type, payer, familyExtras) {
  return fetch(`${process.env.REACT_APP_BASE_URL}/pricing?panelId=${panelId}&geneListType=${type}&payer=${payer}&familyExtras=${familyExtras}`)
    .then((response) => response.json())
    .then((json) => json.data);
}