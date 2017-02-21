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

    const checkbox = { "target": { 
      "value": "on",
      "name": "copy",
      "type": "checkbox",
      "checked":true
    }};
    view.handleChange(checkbox);
    expect(view.state.form.copy).toEqual(true);
  });

  test('handleBack works', () =>  {
    var view = TestUtils.renderIntoDocument(React.createElement(ClinicianDetails, props));                                         
    view.handleBack();
    expect(view.props.router.pop()).toEqual('/step2')
  });
  
  test('handleNext works', () => {
    var view = TestUtils.renderIntoDocument(React.createElement(ClinicianDetails, props));                                         
    view.handleNext(true);
    expect(view.props.router.pop()).toEqual('/step6')
  });
});