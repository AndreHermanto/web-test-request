import React from 'react';
import { 
  initData,
  setFamilyMemberArray 
} from './reducer';

describe('FamilyMember: reducer', () => {
  test('update a property in form state without interfering other state properties', () => {
    const state = initData();
    const newState = setFamilyMemberArray(state, [{}]);
    expect(newState.form.familyMember.length).toEqual(1);
  });
});