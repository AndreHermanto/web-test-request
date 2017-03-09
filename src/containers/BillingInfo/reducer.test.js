import React from 'react';
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
      value: 'John'    
    }
    const newState = setFormData(state, event);
    expect(newState.form.firstName).toEqual('John');

    let eventCheckbox = {
      name: 'consent',
      type: 'checkbox',
      checked: true
    }
    const checkboxState = setFormData(state, eventCheckbox);
    expect(checkboxState.form.consent).toEqual(true);
  });

  test('set billOption to "institution" should clear the payers info', () => {
    let event = {
      name: 'firstName',
      value: 'Dave'    
    }
    const newState = setFormData(state, event);
    expect(newState.form.firstName).toEqual('Dave');

    let billOption = {
      name: 'billOption',
      value: 'Institution'
    }
    const afterBillOptionState = setFormData(newState, billOption);
    expect(afterBillOptionState.form.firstName).toEqual('');
  });

  test('set new select payer for form field', () => {
    let value = 'payer';
    const newState = setSelectData(state, value);
    expect(newState.form.payer).toEqual('payer');
  });

  test('set new other payer for form field, firstName attribute is blank', () => {
    let value = 'Other';
    const newState = setSelectData(state, value);
    expect(newState.form.firstName).toEqual('');
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