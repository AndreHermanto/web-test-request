/**
 * This sets the form data upon onChange.
 * @param {Object} state Targeted state to be changed.
 * @param {string} name Name of the child in the form state.
 * @param {string} value Value for updating.
 */
export function setFormInputData(state, name, value) {
  var formState = Object.assign({}, state.formInput, {
    [name]: value
  });

  return Object.assign({}, state, {
    formInput: formState
  });
}

/**
 * This sets the form's family member data upon onFamilyMemberChange.
 * @param {Object} state Targeted state to be changed.
 * @param {string} name Name of the child in the form state.
 * @param {Integer} index Id of the family member in the array.
 * @param {string} value Value for updating.
 */
export function setFamilyMemberData(state, name, index, value) {
  var arr = state.formInput.FamilyMember.familyMember.slice();
  arr[index][name] = value;
  
  var formState = Object.assign({}, state.formInput, {
    FamilyMember: { familyMember: arr }
  });

  return Object.assign({}, state, {
    formInput: formState
  });
}

/**
 * This sets the form's family member data upon onFamilyMemberChange.
 * @param {Object} state Targeted state to be changed.
 * @param {Integer} index Id of the family member in the array.
 */
export function deleteFamilyMemberData(state, index, value) {
  var arr = state.formInput.FamilyMember.familyMember.slice();
  arr.splice(index, 1);
  
  var formState = Object.assign({}, state.formInput, {
    FamilyMember: { familyMember: arr }
  });

  return Object.assign({}, state, {
    formInput: formState
  });
}