import React from 'react';
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
  const newHCP = {
    additionalFirstName:'',
    additionalLastName:'',
    additionalOrganisation:'',
    additionalEmail:''
  }
  
  test('initialState will set the validation for Copy HCP if prefilled', () => {
    const stateWithCopyHCP = initialState({ copyToHCP: [newHCP,newHCP,newHCP] });
    expect(stateWithCopyHCP.validationCopyHCP.length).toEqual(3);
  });
  
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
    let HCPArray = [];
    let newState = addNewHCP(state, HCPArray);
    expect(newState.form.copyToHCP.length).toEqual(1);

    let removeState = removeHCP(state, HCPArray, 0);
    expect(removeState.form.copyToHCP.length).toEqual(0);

    let target = {
      name: 'additionalFirstName',
      value: 'aa'    
    }

    let setFormState = addNewHCP(state, HCPArray);
    setFormState = setHCPForm(setFormState, HCPArray, target, 0);
    expect(setFormState.form.copyToHCP[0].additionalFirstName).toEqual('aa');
  });

  test('validate form field', () => {
    let validateState = addNewHCP(state);
    let newState = validateClinicianForm(validateState);
    expect(newState.validated).toEqual(true);
  });
});