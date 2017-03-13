import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import FetchMock from 'fetch-mock';
import ClinicianDetails from './index';
describe('<ClinicianDetails />', function() {
  var props = {
    route: {
      onChange: jest.fn(),
      data: {}
    },
    router:['/step4']
  };
  test('handleChange test case: ', () => {
    const view = TestUtils.renderIntoDocument(React.createElement(ClinicianDetails, props));
    const selection = { "target": { 
      "value": "abc",
      "name": "name",
      "type": "text"
    }};
    view.handleChange(selection);
    expect(view.state.form.name).toEqual('abc');
    view.handleAddHCP();
    expect(view.state.form.copyToHCP.length).toEqual(1);
    view.handleRemoveHCP(0);
    expect(view.state.form.copyToHCP.length).toEqual(0);
    view.validate();
    expect(view.state.validated).toEqual(false);
    view.handleConfirm();
    expect(view.state.validated).toEqual(true); 
  });

  test('handleHCPChange works', () =>  {
    var view = TestUtils.renderIntoDocument(React.createElement(ClinicianDetails, props));                                         
    view.handleAddHCP();
    let event = {
      target: {
        value:'aa',
        name:'additionalFirstName'
      }
    };

    view.handleHCPChange(event, 0)
    expect(view.state.form.copyToHCP[0].additionalFirstName).toEqual('aa');

    event = {
      target: {
        value:'lastname',
        name:'additionalLastName'
      }
    }
    view.handleHCPChange(event, 0);
    expect(view.state.form.copyToHCP[0].additionalLastName).toEqual('lastname');

    event = {
      target: {
        value:'additionalOrganisation',
        name:'additionalOrganisation'
      }
    }
    view.handleHCPChange(event, 0);
    expect(view.state.form.copyToHCP[0].additionalOrganisation).toEqual('additionalOrganisation');

    event = {
      target: {
        value:'additionalEmail',
        name:'additionalEmail'
      }
    }
    view.handleHCPChange(event, 0);
    expect(view.state.form.copyToHCP[0].additionalEmail).toEqual(event.target.value);
  });

  test('handleBack works', () =>  {
    var view = TestUtils.renderIntoDocument(React.createElement(ClinicianDetails, props));                                         
    view.handleBack();
    expect(view.props.router.pop()).toEqual('/step4')
  });
  
  test('handleNext works', () => {
    var view = TestUtils.renderIntoDocument(React.createElement(ClinicianDetails, props));                                         
    view.handleNext(true);
    expect(view.props.router.pop()).toEqual('/step6');
    const fail = view.handleNext(false);
    expect(fail).toEqual(false);
  });
});