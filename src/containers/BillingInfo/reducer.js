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
      firstName: 'required',
      lastName: 'required',
      payerEmail: 'required email'
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
  
  var validationStateChild = Object.assign({}, state.validation, {
    [target.name]: validator(value, state.validationRule[target.name])
  });

  return Object.assign({}, state, {
    form: formStateChild,
    validation: validationStateChild
  });
}

/**
* set the phone state when user choose a payer
*/
export function setSelectData(state, value, email) {
  let formStateChild;
  if(value !== 'Other')
  {
    let payer = value.split(' ');
    formStateChild = Object.assign({}, state.form, {
      payer: value,
      givenName: payer[0],
      lastName: payer[1],
      email: email
    });
  }
  else {
    formStateChild = Object.assign({}, state.form, {
      payer: value,
      givenName: '',
      lastName: '',
      email: ''
    });
  }
  return Object.assign({}, state, {
    form: formStateChild
  });
}

/**
* set the phone state when user start typing phone number
*/
export function setPhoneData(state, value) {
  var formStateChild = Object.assign({}, state.form, {
    phone: value
  });
  return Object.assign({}, state, {
    form: formStateChild
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
