import React from 'react';
import { setFormData } from './reducer';

describe('PatientDetails: reducer', () => {
  test('add a property in form state without interfering other state properties', () => {
    const event = {
      name: 'test',
      value: 'Test1',
      type: 'text'
    }
    const state = { 
      form:{}, 
      list:['Test1','Test2','Test3'] 
    };
    const newState = setFormData(state, event);
    expect(newState).toEqual({ 
      form:{
        test: 'Test1'
      }, 
      list:['Test1','Test2','Test3'] 
    });
  });
  
  test('update a property in form state without interfering other state properties', () => {
    const event = {
      name: 'test',
      value: 'Test2',
      type: 'text'
    }
    const name = 'test';
    const state = { 
      form:{
        test: 'Test1'
      }, 
      list:['Test1','Test2','Test3'] 
    };
    const newState = setFormData(state, event);
    expect(newState).toEqual({ 
      form:{
        test: 'Test2'
      }, 
      list:['Test1','Test2','Test3'] 
    });
  });
});
