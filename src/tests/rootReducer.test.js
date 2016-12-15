import React from 'react';
import { setTestList } from './../rootReducer';

describe('rootReducer', () => {
  it('override the test list', () => {
    const list = ['Test1','Test2','Test3'];
    const state = {};
    const newState = setTestList(state, list);
    expect(newState.testList).toEqual(list);
  });
});
