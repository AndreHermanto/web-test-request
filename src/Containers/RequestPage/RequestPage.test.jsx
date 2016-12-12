import React from 'react';
import ReactDOM from 'react-dom';
import fetchMock from 'fetch-mock';
import RequestPage from './index';

describe('App testing', () => {
  it('RequestPage renders without crashing', () => {
    fetchMock.get('*', {hello: 'world'});
    const div = document.createElement('div');
    ReactDOM.render(<RequestPage />, div);
  });
});
