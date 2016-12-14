import React from 'react';
import ReactDOM from 'react-dom';
import FetchMock from 'fetch-mock';
import App from './App';
import * as Utils from './App.utils';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
  
  it('getTestList list out items', async () => {
    FetchMock.get('*',['Test1','Test2','Test3']);
    await Utils.getTestList()
      .then((json) => {
        expect(json.length > 0).toBe(true); 
      });
  });
});
