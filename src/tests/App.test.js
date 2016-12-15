import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
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
});
