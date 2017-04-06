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
  var arr = state.formInput.familyMembersModule.familyMembers.slice();
  arr[index][name] = value;

  let FamilyMemberObj = {
    familyMembers: arr
  }
  if(arr.length){
    FamilyMemberObj = {
      familyMembers: arr,
      optFamily: 'Yes'
    }
  }

  var formState = Object.assign({}, state.formInput, {
    familyMembersModule: FamilyMemberObj
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
  var arr = state.formInput.familyMembersModule.familyMembers.slice();
  arr.splice(index, 1);
  
  var formState = Object.assign({}, state.formInput, {
    familyMembersModule: { familyMembers: arr }
  });

  return Object.assign({}, state, {
    formInput: formState
  });
}

/**
 * set isEdited to true if user move back from summary page
 */
export function setFormEditState(state) {
  return Object.assign({}, state, {
    isEdited: true
  })
}

/**
 * Set "validated" state to true - identifying the confirm button is clicked and validation processed.
 * @param {Object} state Targeted state to be changed.
 */
export function validatedToTrue(state) {
  return Object.assign({}, state, {
    validated: true
  });
}

/**
 * clean form state if user click back from confirmation page to order new test
 */
export function cleanFormState(state) {
  return Object.assign({}, state, {
    formInput: {},
    isEdited: false
  })
}