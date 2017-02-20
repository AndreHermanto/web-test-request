import React from 'react';
import { initialState, setFormData } from './reducer';

describe('ClinicianDetails: reducer', () => {
  test('set new data for form field', () => {
    const initialState = {
      form: {
        copy: false
      }
    }
    expect(initialState).toEqual(initialState);

    const event = {
      name: 'fax',
      value: 'fax',
      type: 'text'
    }
    const newState = setFormData(initialState, event);
    expect(newState).toEqual({ 
      form: {
        copy: false,
        fax:'fax'
      }
    });

    const eventCheckbox = {
      name: 'copy',
      value: 'on',
      checked: true,
      type:'checkbox'
    }

    const checkboxState = setFormData(initialState, eventCheckbox);

    expect(checkboxState.form.copy).toEqual(true);

  });

});