export function initData(prefilled) {
  var state = {
    form: {
      familyMember: []
    }
  };
  
  if(prefilled) state.form = prefilled;
  
  return Object.assign({}, state);
}

/**
 * This sets the form data upon onChange.
 * @param {Object} state Targeted state to be changed.
 * @param {Array} arr Modified array to be added to familyMember state.
 */
export function setFamilyMemberArray(state, arr) {
  return Object.assign({}, state, {
    form: {
      "familyMember": arr
    }
  });
}