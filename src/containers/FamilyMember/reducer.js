export function initData(prefilled) {
  var state = {
    form: {
      familyMember: []
    },
    formId: 'FamilyMember',
    deleteModal:{
      display: false,
      familyMemberId: null
    }
  };
  
  if(prefilled && Object.keys(prefilled).length !== 0) state.form = prefilled;
  
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

/**
 * Add a familyMember object into the familyMember array.
 * @param {Object} state Targeted state to be changed.
 * @param {Boolean} display Whether to display the delete modal.
 * @param {Integer} familyMemberId The index of family member to be removed.
 */
export function setDeleteModal(state, display, familyMemberId) {
  return Object.assign({}, state, {
    deleteModal: {
      display: display,
      familyMemberId: familyMemberId
    }
  });
}