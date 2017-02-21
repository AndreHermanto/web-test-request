import React from 'react';
import { initialState, setFormData } from './reducer';

describe('ClinicianDetails: reducer', () => {
  test('set new data for form field', () => {
    const event = {
      name: 'fax',
      value: 'fax',
      type: 'text'
    }
    const state = initialState();
    const newState = setFormData(state, event);
    expect(newState.form.fax).toEqual('fax');

    const eventCheckbox = {
      name: 'copy',
      value: 'on',
      checked: true,
      type:'checkbox'
    }

    const checkboxState = setFormData(state, eventCheckbox);

    expect(checkboxState.form.copy).toEqual(true);

  });

});