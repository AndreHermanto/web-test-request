import React from 'react';
import { 
  setTestList,
  setGeneList,
  setFormData,
} from './../rootReducer';

describe('rootReducer', () => {
  it('override the test list', () => {
    const list = ['Test1','Test2','Test3'];
    const state = {};
    const newState = setTestList(state, list);
    expect(newState.testList).toEqual(list);
  });
  
  it('override the gene list', () => {
    const list = [{ disorder: 1 }, { disorder: 2 }];
    const state = {};
    const newState = setGeneList(state, list);
    expect(newState.geneList).toEqual(list);
  });
  
  it('add a property in form state without interfering other state properties', () => {
    const value = 'Test1';
    const name = 'test';
    const state = { 
      form:{}, 
      list:['Test1','Test2','Test3'] 
    };
    const newState = setFormData(state, name, value);
    expect(newState).toEqual({ 
      form:{
        test: 'Test1'
      }, 
      list:['Test1','Test2','Test3'] 
    });
  });
  
  it('update a property in form state without interfering other state properties', () => {
    const value = 'Test2';
    const name = 'test';
    const state = { 
      form:{
        test: 'Test1'
      }, 
      list:['Test1','Test2','Test3'] 
    };
    const newState = setFormData(state, name, value);
    expect(newState).toEqual({ 
      form:{
        test: 'Test2'
      }, 
      list:['Test1','Test2','Test3'] 
    });
  });
});
