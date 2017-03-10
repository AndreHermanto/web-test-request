import validator from './../../components/validator';

/**
* initialise billing form data
*/
export function initData(prefilled) {
  var state = {
    form: {
      billOption:'',
      payer:'Other',
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
    priceList:[
    {
      info:'Whole genome analysis',
      price:4360
    },
    {
      info:'Extra family member',
      price:1950
    },
    {
      info:'Extra family member',
      price:1950
    },
    {
      info:'Banking fee for international samples',
      price:50
    },
    {
      info:'TOTAL PRICE',
      price:8310
    }
    ],
    validated: false,
    formId: 'BillingInfo'
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
  
  if(target.name === 'billOption' && value === 'Institution') {
    formStateChild = Object.assign({}, formStateChild, {
      payer:'Other',
      phone:'',
      firstName:'',
      lastName:'',
      payerEmail:'',
      consent:false
    });
  }
  
  var validationStateChild = Object.assign({}, state.validation, {
    [target.name]: validator(value, state.validationRule[target.name])
  });
  
  // BillOption change will change the validation
  if(target.name === 'billOption') {
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
  }

  return Object.assign({}, state, {
    form: formStateChild,
    validation: validationStateChild
  });
}

/**
* set the phone state when user choose a payer
*/
export function setSelectData(state, value, email) {
  let formStateChild, 
      validationStateChild = Object.assign({}, state.validation);
  if(value !== 'Other')
  {
    let payer = value.split(' ');
    formStateChild = Object.assign({}, state.form, {
      payer: value,
      firstName: payer[0],
      lastName: payer[1],
      payerEmail: email
    });
  }
  else {
    formStateChild = Object.assign({}, state.form, {
      payer: value,
      firstName: '',
      lastName: '',
      payerEmail: ''
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
 * Set "validated" state to true - identifying the confirm button is clicked and validation processed.
 * @param {Object} state Targeted state to be changed.
 */
export function validatedToTrue(state, value) {
  return Object.assign({}, state, {
    validated: true
  });
}
