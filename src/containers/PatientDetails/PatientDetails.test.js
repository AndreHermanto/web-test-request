import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import FetchMock from 'fetch-mock';
import PatientDetails from './index';

describe('PatientDetails: index', () => {
  var props = {
    route: {
      onChange: jest.fn(),
      data: {}
    },
    router:['/step2']
  };
  
  test('handleChange works - general', () => {
    const page = TestUtils.renderIntoDocument(React.createElement(PatientDetails, props));
    const selection = { "target": { 
      "value": "abc",
      "name": "name",
      "type": "text"
    }};
    page.handleChange(selection);
    expect(page.state.form.name).toEqual('abc');  
  });
  
  test('handleChange works - checkbox', () => {
    const page = TestUtils.renderIntoDocument(React.createElement(PatientDetails, props));
    const selection = { "target": { 
      "checked": true,
      "name": "deceased",
      "type": "checkbox"
    }};
    page.handleChange(selection);
    expect(page.state.form.deceased).toEqual(true);  
  });  
  
  test('handleBack works', () =>  {
    var page = TestUtils.renderIntoDocument(React.createElement(PatientDetails, props));                                         
    page.handleBack();
    expect(page.props.router.pop()).toEqual('/step1')
  });
  
  test('handleNext works', () => {
    var page = TestUtils.renderIntoDocument(React.createElement(PatientDetails, props));
    page.handleNext(false);
    expect(page.props.router.pop()).toEqual('/step2')
    page.handleNext(true);
    expect(page.props.router.pop()).toEqual('/step3')
  });
  
  test('handleConfirm works', () => {
    var page = TestUtils.renderIntoDocument(React.createElement(PatientDetails, props));
    page.handleConfirm();
    expect(page.state.validated).toEqual(true);
  });
});
