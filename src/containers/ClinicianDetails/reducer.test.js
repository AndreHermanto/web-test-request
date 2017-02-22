import React from 'react';
import Immutable from 'immutable';
import { 
  initialState, 
  setFormData, 
  addNewHCP, 
  removeHCP,
  setHCPForm,
  validateClinicianForm
} from './reducer';

describe('ClinicianDetails: reducer', () => {
  const state = initialState();
  const newHCP = Immutable.fromJS({
    additionalFirstName:'',
    additionalLastName:'',
    additionalOrganisation:'',
    additionalEmail:''
  })
  test('set new data for form field', () => {
    let event = {
      name: 'fax',
      value: 'fax'    
    }
    const newState = setFormData(state, event);
    expect(newState.form.fax).toEqual('fax');
    event = {
      name: 'firstName',
      value: 'aa'    
    }
    const requiredState = setFormData(state, event);
    expect(requiredState.form.firstName).toEqual('aa');

  });

  test('addNewHCP/removeHCP/setHCPForm reducer test', () => {
    let newState = addNewHCP(state);
    expect(newState.additionalForm.get('body').size).toEqual(1);

    newState = removeHCP(state, 0);
    expect(newState.additionalForm.get('body').size).toEqual(0);

    newState = addNewHCP(state);
    const target = {
      name:'additionalFirstName',
      value:'aa'
    }
    let additionalFormValue = setHCPForm(newState, target, 0);
    expect(additionalFormValue.additionalForm.getIn(['body', 0, 'additionalFirstName'])).toEqual('aa');
  });

  test('validate form field', () => {
    let validateState = addNewHCP(state);
    let newState = validateClinicianForm(validateState);
    expect(newState.validated).toEqual(true);
  });
});