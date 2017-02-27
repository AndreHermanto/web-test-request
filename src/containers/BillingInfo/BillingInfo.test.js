import React from 'react';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import BillingInfo from './index';

describe('<BillingInfo/>', function() {
  var props = {
    route: {
      onChange: jest.fn(),
      data: {},
      clinicianData: { firstName:'aa' }
    },
    router:[]
  };

  var emptyClinicianDataProps = {
    route: {
      onChange: jest.fn(),
      data: {},
      clinicianData: {}
    },
    router:[]
  };


  test('handleChange test case: ', () => {
    const view = TestUtils.renderIntoDocument(React.createElement(BillingInfo, props));

    const firstName = { "target": { 
      "value": "aa",
      "name": "firstName",
      "type": "text"
    }};
    view.handleChange(firstName);
    expect(view.state.form.firstName).toEqual('aa');  

    const consent = { "target": { 
      "name": "consent",
      "type": "checkbox",
      checked:true
    }};
    view.handleChange(consent);
    expect(view.state.form.consent).toEqual(true); 

  });

  test('handleSelectChange works', () =>  {
    var view = TestUtils.renderIntoDocument(React.createElement(BillingInfo, props)); 
    const select = {
      value: 'payer'
    };                              
    view.handleSelectChange(select);
    expect(view.state.form.payer).toEqual('payer');
  });

  test('handlePhoneChange works', () =>  {
    var view = TestUtils.renderIntoDocument(React.createElement(BillingInfo, props));
    const phone = 11111;                              
    view.handlePhoneChange(phone);
    expect(view.state.form.phone).toEqual(11111);
  });

  test('getPayers works', () =>  {
    var view = TestUtils.renderIntoDocument(React.createElement(BillingInfo, props));
    const options = [ 
      { value: 'aa', label: 'aa' },
      { value: 'Bob', label: 'Bob' },
      { value: 'Jane', label: 'Jane' },
      { value: 'Other', label: 'Other' } 
    ];
    const payers = view.getPayers();
    expect(payers).toEqual(options);

    const defaultOption = [
      { value: 'Bob', label: 'Bob' },
      { value: 'Jane', label: 'Jane' },
      { value: 'Other', label: 'Other' }
    ];
    var defaultView = TestUtils.renderIntoDocument(React.createElement(BillingInfo, emptyClinicianDataProps));
    const defaultPayers = defaultView.getPayers();
    expect(defaultPayers).toEqual(defaultOption);
  });

  test('handleConfirm works', () =>  {
    var view = TestUtils.renderIntoDocument(React.createElement(BillingInfo, props));                                         
    view.handleConfirm();
    expect(view.state.validated).toEqual(true)
  });
 
  test('handleBack works', () =>  {
    var view = TestUtils.renderIntoDocument(React.createElement(BillingInfo, props));                                         
    view.handleBack();
    expect(view.props.router.pop()).toEqual('/step5')
  });
  
  test('handleNext works', () => {
    var view = TestUtils.renderIntoDocument(React.createElement(BillingInfo, props));                                         
    view.handleNext(true);
    expect(view.props.router.pop()).toEqual('/summary');
    const fail = view.handleNext(false);
    expect(fail).toEqual(false);
  });
});