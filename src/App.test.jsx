import React from 'react';
import ReactDOM from 'react-dom';
import fetchMock from 'fetch-mock';
import App from './App';

describe('App testing', () => {
  it('App renders without crashing', () => {
    fetchMock.get('*', {hello: 'world'});
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
});
