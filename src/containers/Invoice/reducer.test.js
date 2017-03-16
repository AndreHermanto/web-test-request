import React from 'react';
import { setInvoice } from './reducer';

describe('Reducer', () => {
  it('setInvoice', () => {
    const state = {
        id: "test"
    }
    const newState = setInvoice({}, state);
    expect(newState.id).toEqual("test");
  });
});