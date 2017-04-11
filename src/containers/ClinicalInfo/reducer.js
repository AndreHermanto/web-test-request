import validator from './../../components/validator';

export function initData(prefilled) {
  var state = {
    form: {
      clinicalInfo: '',
      relevantInvestigation: '',
      familyHistory: '',
      attachments: [],
      consanguinity: false,
      consanguinityInfo: ''
    },
    validationRule: {
      clinicalInfo: 'required'
    },
    validated: false,
    formId: 'clinicalInfoModule',
    deleteModal:{
      display: false,
      fileId: null
    }
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
 * This sets the form data upon onChange.
 * @param {Object} state Targeted state to be changed.
 * @param {Object} target Target object captured from UI event change.
 */
export function setFormData(state, target) {
  var value, formStateChild;
  switch(target.type) {
    case 'checkbox':
      value = target.checked;
      break;
    default:
      value = target.value;
      break;
  } 

  if(value === false && target.name === 'consanguinity') {
    formStateChild = Object.assign({}, state.form, {
      [target.name]: value,
      consanguinityInfo: ''
    });
  } else {
    formStateChild = Object.assign({}, state.form, {
      [target.name]: value
    });
  }
  
  var validationStateChild = Object.assign({}, state.validation, {
    [target.name]: validator(value, state.validationRule[target.name])
  });

  return Object.assign({}, state, {
    form: formStateChild,
    validation: validationStateChild
  });
}

/**
 * Adds an attachment.
 * @param {Object} state Targeted state to be changed.
 * @param {Object} file File for upload.
 */
export function addAttachment(state, file, id) {
  var attachments = state.form.attachments.slice();
  attachments.push({
    filename: file.name,
    preview: file.preview,
    id: id
  });
  
  var formStateChild = Object.assign({}, state.form, {
    attachments: attachments
  });
  
  return Object.assign({}, state, {
    form: formStateChild
  });
}

/**
 * This sets the form's family member data upon onFamilyMemberChange.
 * @param {Object} state Targeted state to be changed.
 * @param {Integer} index Id of the family member in the array.
 */
export function removeAttachment(state, index) {
  var attachments = state.form.attachments.slice();
  attachments.splice(parseInt(index, 0), 1);
  
  var formStateChild = Object.assign({}, state.form, {
    attachments: attachments
  });
  
  return Object.assign({}, state, {
    form: formStateChild
  });
}

/**
 * Set the state for the delete modal.
 * @param {Object} state Targeted state to be changed.
 * @param {Boolean} display Whether to display the delete modal.
 * @param {Integer} fileId The index of file to be removed.
 */
export function setDeleteModal(state, display, fileId) {
  return Object.assign({}, state, {
    deleteModal: {
      display: display,
      fileId: fileId
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