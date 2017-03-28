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
        name:'firstName'
      }
    };

    view.handleHCPChange(event, 0)
    expect(view.state.form.copyToHCP[0].firstName).toEqual('aa');

    event = {
      target: {
        value:'lastname',
        name:'lastName'
      }
    }
    view.handleHCPChange(event, 0);
    expect(view.state.form.copyToHCP[0].lastName).toEqual('lastname');

    event = {
      target: {
        value:'organisation',
        name:'organisation'
      }
    }
    view.handleHCPChange(event, 0);
    expect(view.state.form.copyToHCP[0].organisation).toEqual('organisation');

    event = {
      target: {
        value:'email',
        name:'email'
      }
    }
    view.handleHCPChange(event, 0);
    expect(view.state.form.copyToHCP[0].email).toEqual(event.target.value);
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