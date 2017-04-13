import React from 'react';
import { setFormInputData, setFormState, cleanFormState } from './rootReducer';

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

  it('set form state function test', () => {

    const state = { 
      isEdited: false
    };
    const newState = setFormState(state, 'isEdited', true);
    expect(newState.isEdited).toEqual(true);
  });

  it('clean state if move back from confirmation', () => {
    const state = { 
      formInput:{
        data:'aaa'
      },
      isEdited: false
    };
    const newState = cleanFormState(state);
    expect(newState.isEdited).toEqual(false);
    expect(newState.formInput).toEqual({});
  });
});
