import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import FetchMock from 'fetch-mock';
import App from './App';
import OrderTest from './containers/OrderTest';

describe('App', () => {
  var props = {
    route: {
      onChange: jest.fn(),
      data: {}
    },
    router:['/step1']
  };
  
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
  
  test('handleChange works inserting form data into the state', () => {
    const page = TestUtils.renderIntoDocument(<App />);
    const form = TestUtils.renderIntoDocument(React.createElement(OrderTest, props));
    form.state.form.name = 'abc';
    page.handleChange(form);
    expect(page.state.formInput.OrderTest.name).toEqual('abc');  
  });
  
  test('handleChange take no action if form state is unavailable', () => {
    const page = TestUtils.renderIntoDocument(<App />);
    const form = TestUtils.renderIntoDocument(React.createElement(OrderTest, props));
    form.state = undefined;
    page.handleChange(form);
    expect(page.state.formInput).toEqual({});  
  });  
});
