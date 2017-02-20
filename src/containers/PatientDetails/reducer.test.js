import React from 'react';
import { 
  initData,
  setFormData 
} from './reducer';

describe('PatientDetails: reducer', () => {
  test('update a property in form state without interfering other state properties', () => {
    const event = {
      name: 'lastName',
      value: 'John',
      type: 'text'
    }
    const name = 'test';
    const state = initData();
    const newState = setFormData(state, event);
    console.log(newState);
    expect(newState.form.lastName).toEqual('John');
  });
});
