import React from 'react';
import { 
  initData,
  addFamilyMember 
} from './reducer';

describe('FamilyMember: reducer', () => {
  test('addFamilyMember add a family object', () => {
    const state = initData();
    const newState = addFamilyMember(state);
    expect(newState.form.familyMember.length).toEqual(1);
  });
});