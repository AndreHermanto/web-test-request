import validator from './../../components/validator';

export function initData(prefilled) {
  var state = {
    form: {
      optFamily: '',
      familyMembers: []
    },
    formId: 'familyMembersModule',
    deleteModal:{
      display: false,
      familyMemberId: null
    },
    validationRule: {
      optFamily: 'requireSelectNoObj',
    },
    validated: false
  };
  
  if(prefilled && Object.keys(prefilled).length !== 0) state.form = prefilled;
  
  // This validates the data in the initial state.
  state.validation = {};
  for (var field in state.validationRule) {
    if(field) {
      state.validation[field] = validator(state.form[field], state.validationRule[field]);
    }
  }
  
  return Object.assign({}, state);
}

/**
 * Add a familyMember object into the familyMember array.
 * @param {Object} state Targeted state to be changed.
 * @param {Array} arr Modified array to be added to familyMember state.
 */
export function addFamilyMember(state, familyMemberArray) {
  var newArray = familyMemberArray || [];
  newArray.push({ familyMemberDetails: {}, familyMemberClinicalInfo: {} })
  
  var newForm = Object.assign({}, state.form, {
      "familyMembers": newArray
  });

  return Object.assign({}, state, {
    form : newForm
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

/**
 * Set "optFamily" state - set optFamily value form radio button.
 * @param {Object} state Targeted state to be changed.
 */
export function setOptFamily(state, value) {
  return Object.assign({}, state, {
    form:{
      optFamily : value,
      familyMembers: []
    },
    validation: {
      optFamily: validator(value, state.validationRule.optFamily)
    }
  });
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