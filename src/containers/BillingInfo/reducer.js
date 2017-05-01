import validator from './../../components/validator';

/**
* initialise billing form data
*/
export function initData(prefilled) {
  var state = {
    form: {
      billOption:'',
      payer:'',
      phone:'',
      firstName:'',
      lastName:'',
      payerEmail:'',
      consent:false
    },
    validationRule: {
      billOption: 'requireSelectNoObj',
      consent: 'payerConsentTrue',
      firstName: 'required',
      lastName: 'required',
      payerEmail: 'required email',
      phone: 'required number'
    },
    priceList:[],
    validated: false,
    formId: 'billingInfoModule',
    payer: {
      id: ''
    }
  };
  var selectedPayer;

  if(prefilled && Object.keys(prefilled).length !== 0) {
    state.form = prefilled;
    if(state.form.payer !== 'Other'){
      selectedPayer = Object.assign({}, state.payer, {
        id: prefilled.firstName + ' ' + prefilled.lastName
      });     
    }else{
      selectedPayer = Object.assign({}, state.payer, {
        id: 'Other'
      });  
    }

  }
  // This validates the data in the initial state.
  state.validation = {};
  for (var field in state.validationRule) {
    if(field) {
      state.validation[field] = validator(state.form[field], state.validationRule[field]);
    }
  }
  
  // If prefilled, determine whether to skip the validation based on prefilled billOption.
  if(state.form.billOption === 'Institution') {
    for (field in state.validation) {
      if(field !== 'billOption') state.validation[field].skip = true;
    }
      return Object.assign({}, state);
  } else {
    for (field in state.validation) {
      if(field !== 'billOption') state.validation[field].skip = false;
    }
    return Object.assign({}, state, {
      payer: selectedPayer
    });
  }
  
}


/**
 * This sets the form data upon onChange.
 * @param {Object} state Targeted state to be changed.
 * @param {Object} target Target object captured from UI event change.
 */
export function setFormData(state, target) {
  var value;
  switch(target.type) {
    case 'checkbox':
      value = target.checked;
      break;
    default:
      value = target.value;
      break;
  } 
  
  var formStateChild = Object.assign({}, state.form, {
    [target.name]: value
  });

  var validationStateChild = Object.assign({}, state.validation, {
    [target.name]: validator(value, state.validationRule[target.name])
  });

  return Object.assign({}, state, {
    form: formStateChild,
    validation: validationStateChild
  });
}

/**
 * This sets the form data upon onChange.
 * @param {Object} state Targeted state to be changed.
 * @param {Object} payerObj The payer info.
 */
export function setBillOption(state, target, payerObj) {
  var value = target.value;

  var formStateChild = Object.assign({}, state.form, {
    billOption: value
  });

  var validationStateChild = Object.assign({}, state.validation);

  var selectPayer = Object.assign({}, state.payer);
  
  if(value === 'Institution') {
    formStateChild = Object.assign({}, formStateChild, {
      payer: payerObj.id,
      phone: '',
      firstName: '',
      lastName: '',
      payerEmail: '',
      consent: true
    });
  } else {
    formStateChild = Object.assign({}, formStateChild, {
      payer: payerObj.label,
      phone: '',
      firstName: payerObj.firstName,
      lastName: payerObj.lastName,
      payerEmail: '',
      consent: false
    });
    selectPayer = Object.assign({}, state.payer, {
      id: payerObj.id
    });
  }
  var field;
  
  if(value === 'Institution') {
    for (field in validationStateChild) {
      if(field !== 'billOption') validationStateChild[field].skip = true;
    }
  } else {
    for (field in validationStateChild) {
      if(field !== 'billOption') validationStateChild[field].skip = false;
    }
  }
  
  for (field in validationStateChild) {
    if(!validationStateChild[field].skip) validationStateChild[field] = validator(formStateChild[field], state.validationRule[field]);
  }

  return Object.assign({}, state, {
    form: formStateChild,
    validation: validationStateChild,
    payer : selectPayer
  });
}

/**
* set the phone state when user choose a payer
*/
export function setSelectData(state, value, payerObj) {
  let formStateChild, 
      validationStateChild = Object.assign({}, state.validation);

  if(value !== 'Other')
  {

    formStateChild = Object.assign({}, state.form, {
      payer: value,
      firstName: payerObj.firstName,
      lastName: payerObj.lastName,
      phone:'',
      payerEmail:''
    });
  }
  else {
    formStateChild = Object.assign({}, state.form, {
      payer: value,
      firstName: '',
      lastName: '',
      phone:'',
      payerEmail:''
    });
  }
  
  // This also involve with validation    
  for (var field in validationStateChild) {
    if(field) validationStateChild[field] = validator(formStateChild[field], state.validationRule[field]);
  }
  
  return Object.assign({}, state, {
    form: formStateChild,
    validation: validationStateChild
  });
}

/**
 * Set pricing.
 * @param {Object} state Targeted state to be changed.
 * @param {Object[]} value A breakdown array used to caluclate pricing.
 */
export function setPricing(state, value) {
  let totalPrice = value[value.length - 1].price;
  let formStateChild = Object.assign({}, state.form, {
    billPrice: totalPrice
  });
  return Object.assign({}, state, {
    form: formStateChild,
    priceList: value
  });
}


/**
 * Set "validated" state to true - identifying the confirm button is clicked and validation processed.
 * @param {Object} state Targeted state to be changed.
 */
export function validatedToTrue(state, value) {
  return Object.assign({}, state, {
    validated: true
  });
}
