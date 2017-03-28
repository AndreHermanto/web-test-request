import React from 'react';
import { 
  initData,
  addFamilyMember,
  setDeleteModal
} from './reducer';

describe('FamilyMember: reducer', () => {
  test('addFamilyMember add a family object', () => {
    const state = initData();
    const newState = addFamilyMember(state);
    expect(newState.form.familyMembers.length).toEqual(1);
  });
  
  test('setDeleteModal sets the delete modal', () => {
    const state = initData();
    const newState = setDeleteModal(state, true, 5);
    expect(newState.deleteModal.display).toEqual(true);
    expect(newState.deleteModal.familyMemberId).toEqual(5);
  });
});