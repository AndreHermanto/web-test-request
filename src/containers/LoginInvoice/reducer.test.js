import React from 'react';
import { 
  initData,
  setFormState 
} from './reducer';

describe('Set Form State: reducer', () => {
  test('update a property in form state without interfering other state properties', () => {
    const event = {
      name: 'lastName',
      value: 'John',
      type: 'text'
    }
    const name = 'test';
    const state = initData();
    const newState = setFormState(state, event);
    expect(newState.form.lastName).toEqual('John');
  });
});