import React from 'react';
import { setFormInputData } from './rootReducer';

describe('rootReducer', () => {
  test('add a property in form state without interfering other state properties', () => {
    const value = {};
    const name = 'form1';
    const state = { 
      formInput:{}
    };
    const newState = setFormInputData(state, name, value);
    expect(newState).toEqual({ 
      formInput:{
        form1: {}
      }
    });
  });
  
  test('update a property in form state without interfering other state properties', () => {
    const value = {};
    const name = 'form2';
    const state = { 
      formInput:{
        form1: { name: 'dave' }
      }
    };
    const newState = setFormInputData(state, name, value);
    expect(newState).toEqual({ 
      formInput:{
        form1: { name: 'dave' },
        form2: {}
      }
    });
  });
});
