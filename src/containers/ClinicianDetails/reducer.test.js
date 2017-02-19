import React from 'react';
import { setFormData } from './reducer';

describe('ClinicianDetails: reducer', () => {
  test('set new data for form field', () => {
    const event = {
      name: 'fax',
      value: 'fax',
      type: 'text'
    }
    const state = { 
        form: {
          copy: false
        }
    }
    const newState = setFormData(state, event);
    expect(newState).toEqual({ 
      form: {
        copy: false,
        fax:'fax'
      }
    });
  });
});