import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import FetchMock from 'fetch-mock';
import FamilyMemberDetails from './index';

describe('FamilyMemberDetails: index', () => {
  var props = {
    route: {
      onChange: jest.fn(),
      onDelete: jest.fn(),
      data: { familyMembers: [
        { familyMemberDetails: {}, familyMemberClinicalInfo: {} },
        { familyMemberDetails: {}, familyMemberClinicalInfo: {} },
        { familyMemberDetails: {}, familyMemberClinicalInfo: {} },
        { familyMemberDetails: {}, familyMemberClinicalInfo: {} }
      ] }
    },
    params:{
      mode: 'add',
      id: 3
    },
    router:['/step4/add/1/3']
  };
  
  test('handleChange works - general', () => {
    const page = TestUtils.renderIntoDocument(React.createElement(FamilyMemberDetails, props));
    const selection = { "target": { 
      "value": "abc",
      "name": "name",
      "type": "text"
    }};
    page.handleChange(selection);
    expect(page.state.form.name).toEqual('abc');  
  });
  
  test('handleChange works - checkbox', () => {
    const page = TestUtils.renderIntoDocument(React.createElement(FamilyMemberDetails, props));
    const selection = { "target": { 
      "checked": true,
      "name": "deceased",
      "type": "checkbox"
    }};
    page.handleChange(selection);
    expect(page.state.form.deceased).toEqual(true);  
  });  
  
  test('handleCancel works', () =>  {
    var page = TestUtils.renderIntoDocument(React.createElement(FamilyMemberDetails, props));                                         
    page.handleCancel();
    expect(page.props.router.pop()).toEqual('/step4');
  });
  
  test('handleNext works', () => {
    var page = TestUtils.renderIntoDocument(React.createElement(FamilyMemberDetails, props));
    page.handleNext(false);
    expect(page.props.router.pop()).toEqual('/step4/add/1/3');
    page.handleNext(true);
    expect(page.props.router.pop()).toEqual('/step4/add/2/3');
  });
  
  test('handleConfirm works', () => {
    var page = TestUtils.renderIntoDocument(React.createElement(FamilyMemberDetails, props));
    page.handleConfirm();
    expect(page.state.validated).toEqual(true);
  });
});
