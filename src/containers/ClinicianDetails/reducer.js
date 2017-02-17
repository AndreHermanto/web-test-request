import Immutable from 'immutable';
export function initialState(state) {
  return Object.assign({}, {
      form: Immutable.fromJS({
      fax:'',
      email:''
    })
  });
}

export function setFormData(state = initialState, name, data) {
  return Object.assign({}, state, {
    form: state.form.update(name, value => data)
  });
}

export default { 
  initialState,
  setFormData
};