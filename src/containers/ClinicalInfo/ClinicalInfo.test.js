import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import FetchMock from 'fetch-mock';
import ClinicalInfo from './index';

describe('ClinicalInfo: index', () => {
  var props = {
    route: {
      onChange: jest.fn(),
      data: {}
    },
    router:['/step3']
  };
  
  test('renders without crashing', () => {
    const page = renderer.create(React.createElement(ClinicalInfo, props)).toJSON();
    expect(page).toMatchSnapshot();
  });
  
  test('handleChange works - general', () => {
    const page = TestUtils.renderIntoDocument(React.createElement(ClinicalInfo, props));
    const selection = { "target": { 
      "value": "abc",
      "name": "clinicalInfo",
      "type": "text"
    }};
    page.handleChange(selection);
    expect(page.state.form.clinicalInfo).toEqual('abc');  
  });
  
  test('handleChange works - checkbox', () => {
    const page = TestUtils.renderIntoDocument(React.createElement(ClinicalInfo, props));
    const selection = { "target": { 
      "checked": true,
      "name": "consangunity",
      "type": "checkbox"
    }};
    page.handleChange(selection);
    expect(page.state.form.consangunity).toEqual(true);  
  });  
  
  test('handleBack works', () =>  {
    var page = TestUtils.renderIntoDocument(React.createElement(ClinicalInfo, props));                                         
    page.handleBack();
    expect(page.props.router.pop()).toEqual('/step2')
  });
  
  test('handleNext works', () => {
    var page = TestUtils.renderIntoDocument(React.createElement(ClinicalInfo, props));
    page.handleNext(false);
    expect(page.props.router.pop()).toEqual('/step3')
    page.handleNext(true);
    expect(page.props.router.pop()).toEqual('/step4')
  });
  
  test('handleConfirm works', () => {
    var page = TestUtils.renderIntoDocument(React.createElement(ClinicalInfo, props));
    page.handleConfirm();
    expect(page.state.validated).toEqual(true);
  });
});
