import React from 'react';
import { 
  setPanelsData
} from './reducer';

describe('OrderTest: reducer', () => {
  test('override the test list', () => {
    const list = ['Test1','Test2','Test3'];
    const state = {};
    const newState = setPanelsData(state, list);
    //expect(newState.panels).toEqual(list);
  });
});
