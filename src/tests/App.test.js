import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import FetchMock from 'fetch-mock';
import App from './../App';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
  
  it('be able to update a form state', () => {
    const app = TestUtils.renderIntoDocument(
      <App />
    );
      
    app.handleChange({
      target:{
        name: 'test',
        value: 'Test3'
      }  
    });
    
    expect(app.state.form.test).toEqual('Test3');
  });
  
  it('successful onFormSubmit should return something', async () => {
    const app = TestUtils.renderIntoDocument(
      <App />
    );
    FetchMock.post('*', { "data": { "id": "ABC" } }); 
    await app.onFormSubmit().then((response) => {
      expect(response).toEqual({ "id": "ABC" }); 
    });
    FetchMock.restore();
  });
});
