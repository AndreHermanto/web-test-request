import React from 'react';
import ReactDOM from 'react-dom';
import fetchMock from 'fetch-mock';
import RequestPage from './RequestPage';

describe('App testing', () => {
  it('RequestPage renders without crashing', () => {
    fetchMock.get('*', {hello: 'world'});
    const div = document.createElement('div');
    ReactDOM.render(<RequestPage />, div);
  });
});
