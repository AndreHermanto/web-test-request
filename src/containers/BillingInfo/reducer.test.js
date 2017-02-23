import React from 'react';
import Immutable from 'immutable';
import { 
  initData, 
  setFormData, 
  setSelectData, 
  setPhoneData,
  validatedToTrue,
} from './reducer';

describe('ClinicianDetails: reducer', () => {
  const state = initData();
  test('set new data for form field', () => {
    let event = {
      name: 'firstName',
      value: 'firstName'    
    }
    const newState = setFormData(state, event);
    expect(newState.form.firstName).toEqual('firstName');

    let eventCheckbox = {
      name: 'consent',
      type: 'checkbox',
      checked:true
    }
    const checkboxState = setFormData(state, eventCheckbox);
    expect(checkboxState.form.consent).toEqual(true);
  });

  test('set new select payer for form field', () => {
    let value = 'payer';
    const newState = setSelectData(state, value);
    expect(newState.form.payer).toEqual('payer');
  });

  test('set phone data for form field', () => {
    let value = 1111;
    const newState = setPhoneData(state, value);
    expect(newState.form.phone).toEqual(1111);
  });

  test('validate to true test', () => {
    const newState = validatedToTrue(state);
    expect(newState.validated).toEqual(true);
  });
});