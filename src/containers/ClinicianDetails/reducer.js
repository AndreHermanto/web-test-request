export function initialState(state) {
  return Object.assign({}, {
      form: {
        copy: false
    }
  });
}

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
  
  return Object.assign({}, state, {
    form: formStateChild
  });
}

export default { 
  initialState,
  setFormData
};