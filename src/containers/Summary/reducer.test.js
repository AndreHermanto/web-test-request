import React from 'react';
import { 
  initData, 
  setSignatureData, 
  validatedToTrue
} from './reducer';

describe('Summary: reducer', () => {
  const state = initData();

  test('set new data for signature field', () => {
    let event = {
      target: {
        name:'signature',
        type: 'checkbox',
        checked: true
      } 
    }
    const newState = setSignatureData(state, event.target);
    expect(newState.form.signature).toEqual(true);
    let eventFalse = {
      target: {
        name:'signature',
        type: 'checkbox',
        checked: false
      } 
    }
  });

  test('validate to true test', () => {
    const newState = validatedToTrue({});
    expect(newState.validated).toEqual(true);
  });
});