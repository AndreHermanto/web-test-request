import React from 'react';
import { 
  setTestList,
  setTestType
} from './reducer';

describe('OrderTest: reducer', () => {
  it('override the test list', () => {
    const list = ['Test1','Test2','Test3'];
    const state = {};
    const newState = setTestList(state, list);
    expect(newState.testList).toEqual(list);
  });
  
  it('update the test type', () => {
    const value = { label: 'Test2', genes: ['ABC','DEF'] };
    const state = { 
      form:{
        test: { label: 'Test1', genes: ['XYZ'] },
        genes: ['XYZ']
      }, 
      list:['Test1','Test2','Test3'] 
    };
    const newState = setTestType(state, value);
    expect(newState).toEqual({ 
      form:{
        test: { label: 'Test2', genes: ['ABC','DEF'] },
        genes: ['ABC','DEF']
      }, 
      list:['Test1','Test2','Test3'] 
    });
  });
});
