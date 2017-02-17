import React from 'react';
import Immutable from 'immutable';
import { setFormData } from './reducer';

describe('ClinicianDetails: reducer', () => {
  test('set new data for form field', () => {
    const event = {
      name: 'fax',
      value: 'fax',
      type: 'text'
    }
    const state = { 
        form: Immutable.fromJS({
          fax:''      
      })
    }
    const newState = setFormData(state, event.name, event.value);
    expect(newState).toEqual({ 
      form: Immutable.fromJS({
        fax:'fax'
      })
    });
  });
});