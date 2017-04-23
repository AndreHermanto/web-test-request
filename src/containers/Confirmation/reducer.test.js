import React from 'react';
import { 
  initData,
  setPrintType
} from './reducer';

describe('Confirmation: reducer', () => {
  test('initData', () => {
    const latestRequestID = 1;
    const createdDateTime = '2017-04-23T23:43:03.626Z';
    const state = {};
    const newState = initData(state, latestRequestID, createdDateTime);
    expect(newState.form.latestRequestID).toEqual(1);
    expect(newState.form.createdDateTime).toEqual('2017-04-23T23:43:03.626Z')
  });

  test('initData', () => {
    const state = {};
    const newState = setPrintType(state, 2);
    expect(newState.print).toEqual(2);
  });
});
