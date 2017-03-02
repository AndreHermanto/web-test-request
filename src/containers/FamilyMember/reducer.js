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
 * Add a familyMember object into the familyMember array.
 * @param {Object} state Targeted state to be changed.
 * @param {Array} arr Modified array to be added to familyMember state.
 */
export function addFamilyMember(state, familyMemberArray) {
  var newArray = familyMemberArray || [];
  newArray.push({ FamilyMemberDetails: {}, FamilyMemberClinicalInfo: {} })
  
  return Object.assign({}, state, {
    form: {
      "familyMember": newArray
    }
  });
}