export function initData(testRequest) {
  var state = {
    form: {
      testRequest    
    },
    submitStatus: ''
  };
  
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
