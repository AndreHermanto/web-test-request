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
      familyMembers: 'familyMember'
    },
    validated: false
  };
  
  if(prefilled && Object.keys(prefilled).length !== 0) state.form = prefilled;
  
  if(state.form.familyMembers.length){
    state.form.optFamily = 'Yes';
  }

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
  var curForm = Object.assign({}, state.form);
  return Object.assign({}, state, {
    form: curForm,
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
  var validationStateChild = Object.assign({}, state.validation);

  var formStateChild = Object.assign({}, state.form, {
    optFamily: value
  });

  var field;

  if(value === 'No') {
    for (field in validationStateChild) {
      if(field === 'familyMembers') {
        validationStateChild[field].skip = true;
      }else{
        validationStateChild[field].skip = false;
      }
    }
  }else{
    for (field in validationStateChild) {
      if(field === 'familyMembers') {
        validationStateChild[field].skip = false;
      }
    }    
  }


  for (field in validationStateChild) {
    if(!validationStateChild[field].skip) {
      validationStateChild[field] = validator(formStateChild[field], state.validationRule[field]);
    }else{
      validationStateChild[field].status = null
    }
  }

  if(value === 'No'){
    formStateChild = Object.assign({}, state.form, {
      optFamily: value,
      familyMembers: []
    });
  }

  return Object.assign({}, state, {
    form: formStateChild,
    validation: validationStateChild
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