import React from 'react';
import { 
  initData,
  setFormData 
} from './reducer';

describe('FamilyMemberClinicalInfo: reducer', () => {
  test('update a property in form state without interfering other state properties', () => {
    const event = {
      name: 'clinicalInfo',
      value: 'This is his clinical information.',
      type: 'text'
    }
    const state = initData();
    const newState = setFormData(state, event);
    expect(newState.form.clinicalInfo).toEqual('This is his clinical information.');
  });
});
