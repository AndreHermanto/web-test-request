import React from 'react';
import { 
  initData, 
  setSignatureData, 
  setSubmitStatusData,
  setSubmitData,
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
    const newState = validatedToTrue(state);
    expect(newState.validated).toEqual(true);
  });

  test('submitStatus data test', () => {
    const newState = setSubmitStatusData(state, 'loading');
    expect(newState.submitStatus).toEqual('loading');
  });

  test('submitData data test', () => {
    const newState = setSubmitData(state, true);
    expect(newState.Signature).toEqual(true);
  });
});