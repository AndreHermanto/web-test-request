import React from 'react';
import { 
  initData, 
  setSignatureData, 
  setSubmitStatusData,
} from './reducer';

describe('Summary: reducer', () => {
  const state = initData();

  test('set new data for signature field', () => {
    const newState = setSignatureData(state, true);
    expect(newState.signature).toEqual(true);
  });

  test('submitStatus data test', () => {
    const newState = setSubmitStatusData(state, 'loading');
    expect(newState.submitStatus).toEqual('loading');
  });

});