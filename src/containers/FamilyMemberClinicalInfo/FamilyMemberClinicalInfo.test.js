import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import FetchMock from 'fetch-mock';
import FamilyMemberClinicalInfo from './index';

describe('FamilyMemberClinicalInfo: index', () => {
  var props = {
    route: {
      onChange: jest.fn(),
      onDelete: jest.fn(),
      data: { familyMember: [
        { FamilyMemberDetails: {}, FamilyMemberClinicalInfo: {} },
        { FamilyMemberDetails: {}, FamilyMemberClinicalInfo: {} },
        { FamilyMemberDetails: {}, FamilyMemberClinicalInfo: {} },
        { FamilyMemberDetails: {}, FamilyMemberClinicalInfo: {} }
      ] }
    },
    params:{
      mode: 'add',
      id: 3
    },
    router:['/step4/add/2/3']
  };
  
  /*var editProps = {
    route: {
      onChange: jest.fn(),
      onDelete: jest.fn(),
      data: { familyMember: [
        { FamilyMemberDetails: {}, FamilyMemberClinicalInfo: {} },
        { FamilyMemberDetails: {}, FamilyMemberClinicalInfo: {} },
        { FamilyMemberDetails: {}, FamilyMemberClinicalInfo: {} }
      ] }
    },
    params:{
      mode: 'edit',
      id: 5
    },
    router:['/step4/edit/2/5']
  };*/
  
  test('renders without crashing', () => {
    const page = renderer.create(React.createElement(FamilyMemberClinicalInfo, props)).toJSON();
    expect(page).toMatchSnapshot();
  });
  
  test('handleChange works - general', () => {
    const page = TestUtils.renderIntoDocument(React.createElement(FamilyMemberClinicalInfo, props));
    const selection = { "target": { 
      "value": "abc",
      "name": "clinicalInfo",
      "type": "text"
    }};
    page.handleChange(selection);
    expect(page.state.form.clinicalInfo).toEqual('abc');  
  });
  
  test('handleChange works - checkbox', () => {
    const page = TestUtils.renderIntoDocument(React.createElement(FamilyMemberClinicalInfo, props));
    const selection = { "target": { 
      "checked": true,
      "name": "consangunity",
      "type": "checkbox"
    }};
    page.handleChange(selection);
    expect(page.state.form.consangunity).toEqual(true);  
  });  
  
  test('handleBack works', () =>  {
    var page = TestUtils.renderIntoDocument(React.createElement(FamilyMemberClinicalInfo, props));                                         
    page.handleBack();
    expect(page.props.router.pop()).toEqual('/step4/add/1/3')
  });
  
  test('handleCancel works', () =>  {
    var page = TestUtils.renderIntoDocument(React.createElement(FamilyMemberClinicalInfo, props));                                         
    page.handleCancel();
    expect(page.props.router.pop()).toEqual('/step4');
  });
  
  test('handleNext works', () => {
    var page = TestUtils.renderIntoDocument(React.createElement(FamilyMemberClinicalInfo, props));
    page.handleNext(false);
    expect(page.props.router.pop()).toEqual('/step4/add/2/3');
    page.handleNext(true);
    expect(page.props.router.pop()).toEqual('/step4');
  });
  
  test('handleConfirm works', () => {
    var page = TestUtils.renderIntoDocument(React.createElement(FamilyMemberClinicalInfo, props));
    page.handleConfirm();
    expect(page.state.validated).toEqual(true);
  });
});
