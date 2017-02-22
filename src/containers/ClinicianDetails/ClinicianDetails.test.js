import React from 'react';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import ClinicianDetails from './index';

describe('<ClinicianDetails />', function() {
  var props = {
    route: {
      onChange: jest.fn()
    },
    router:[]
  };
  it('renders correctly', function() {
    const tree = renderer.create(<ClinicianDetails />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('handleChange test case: ', () => {
    const view = TestUtils.renderIntoDocument(<ClinicianDetails />);
    const fax = { "target": { 
      "value": "fax",
      "name": "fax",
      "type": "text"
    }};
    view.handleChange(fax);
    expect(view.state.form.fax).toEqual('fax');

    const firstName = { "target": { 
      "value": "aa",
      "name": "firstName",
      "type": "text"
    }};
    view.handleChange(firstName);
    expect(view.state.form.firstName).toEqual('aa');  

    view.handleAddHCP();
    expect(view.state.additionalForm.get('body').size).toEqual(1);
    view.handleRemoveHCP(0);
    expect(view.state.additionalForm.get('body').size).toEqual(0);
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
        name:'additionFirstName'
      }
    }
    view.handleHCPChange(event, 0)
    expect(view.state.additionalForm.getIn(['body', 0, 'additionFirstName'])).toEqual('aa');

    event = {
      target: {
        value:'lastname',
        name:'additionalLastName'
      }
    }
    view.handleHCPChange(event, 0);
    expect(view.state.additionalForm.getIn(['body', 0, 'additionalLastName'])).toEqual('lastname');

    event = {
      target: {
        value:'additionalOrganisation',
        name:'additionalOrganisation'
      }
    }
    view.handleHCPChange(event, 0);
    expect(view.state.additionalForm.getIn(['body', 0, 'additionalOrganisation'])).toEqual('additionalOrganisation');

    event = {
      target: {
        value:'additionalEmail',
        name:'additionalEmail'
      }
    }
    view.handleHCPChange(event, 0);
    expect(view.state.additionalForm.getIn(['body', 0, 'additionalEmail'])).toEqual('additionalEmail');
  });

  test('handleBack works', () =>  {
    var view = TestUtils.renderIntoDocument(React.createElement(ClinicianDetails, props));                                         
    view.handleBack();
    expect(view.props.router.pop()).toEqual('/step3')
  });
  
  test('handleNext works', () => {
    var view = TestUtils.renderIntoDocument(React.createElement(ClinicianDetails, props));                                         
    view.handleNext(true);
    expect(view.props.router.pop()).toEqual('/step5');
    const fail = view.handleNext(false);
    expect(fail).toEqual(false);
  });
});