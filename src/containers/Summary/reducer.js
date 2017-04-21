import validator from './../../components/validator';

export function initData(testRequest) {
  var state = {
    form: {
      testRequest    
    },
    submitStatus: ''
  };
  // This validates the data in the initial state.
  state.validation = {};
  for (var field in state.validationRule) {
    if(field) {
      state.validation[field] = validator(state.form[field], state.validationRule[field]);
    }
  }
  
  return Object.assign({}, state);
}

export function setSubmitStatusData(state, value)
{
  return Object.assign({}, state, {
    submitStatus: value
  });
}


/**
 * Set pricing.
 * @param {Object} state Targeted state to be changed.
 * @param {Object[]} value A breakdown array used to caluclate pricing.
 */
export function setPricing(state, value) {
  let totalPrice = value[value.length - 1].price;
  let formStateChild = Object.assign({}, state, {
    billPrice: totalPrice
  });
  let newState = Object.assign({}, {
    form: formStateChild,
    formId: 'billingInfoModule'
  });
  
  return { state: newState };
}


export function setSignatureData(state, value) {
  var formStateChild = Object.assign({}, state.form.testRequest, {
    signature: value
  });

  return state.form.testRequest = formStateChild;
}
